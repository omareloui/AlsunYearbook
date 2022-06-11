import type {
  ActionAffectedField,
  CreateUser,
  JWTUser,
  User as UserInterface,
  UserActivities,
  UserImage,
  UserName,
  UserSocialMedia,
} from "types";

import { User } from "server/models";
import { hasToHaveAuthority } from "server/policies";
import {
  extractFBId,
  extractIGId,
  extractTWTId,
  extractYTId,
} from "server/utils";

import { useUserIsInYearbook } from "~~/composables/useUserIsInYearbook";
import { useUserAuthorityRolePowers } from "~~/composables/useUserAuthorityRolePowers";
import { useCloneObject } from "~~/composables/useCloneObject";
import useGetObjectValue from "~~/composables/useGetObjectValue";

import {
  CloudinaryController,
  ActionController,
  MessageController,
  CloseFriendController,
} from "controllers";

export class UserController {
  static getAll = defineEventHandler(async event => {
    hasToHaveAuthority(event);

    const users = await User.find()
      .sort([
        ["name.first", 1],
        ["name.second", 1],
        ["name.third", 1],
      ])
      .exec();

    return users;
  });

  static getUser = defineEventHandler(async event => {
    hasToHaveAuthority(event);

    const query = useQuery(event.req);
    const userId = query.id as string | undefined;
    if (!userId) return;

    const user = await User.findOne({ "socialMedia.fb": userId });

    if (!user)
      throw createError({ message: "Can't find the user", statusCode: 404 });

    return user;
  });

  static create = defineEventHandler(async event => {
    hasToHaveAuthority(event);

    const { req, context } = event;

    const body = (await useBody(req)) as CreateUser;
    delete body._id;

    const user = this.populateUser(body);

    await this.validateCreatingUser(user);
    await user.save();

    await ActionController.create(
      context.user.id,
      `Add ${user.name.first} ${user.name.second} ${user.name.third}.`,
      user._id.toString()
    );

    return user;
  });

  static edit = defineEventHandler(async event => {
    hasToHaveAuthority(event);

    const { req, context } = event;

    const body = (await useBody(req)) as CreateUser;

    const oldUser = await User.findOne({ _id: body._id }).exec();
    if (!oldUser)
      throw createError({
        message: "Can't find the user to update",
        statusCode: 404,
      });

    const clonedOldUser = useCloneObject(oldUser);

    const oldImage =
      oldUser.image?.original && oldUser.image.thumbnail
        ? { ...oldUser.image }
        : null;

    const shouldRemoveImages = this.shouldRemoveOldImage(oldUser, body);

    const user = this.populateUser(body, oldUser as UserInterface);
    await this.validateEditUser(user, clonedOldUser, context.user);

    if (shouldRemoveImages && oldImage)
      await CloudinaryController.removeUserImage(oldImage);

    const affectedFields = this.compareDocuments(clonedOldUser, user);

    if (affectedFields.length === 0) return user;

    user.isShown = clonedOldUser.isShown;
    await user.save();

    await ActionController.create(
      context.user.id,
      `Edit ${user.name.first} ${user.name.second} ${user.name.third}.`,
      user._id.toString(),
      affectedFields
    );

    return user as UserInterface;
  });

  static toggleShow = defineEventHandler(async event => {
    const { req, context } = event;
    hasToHaveAuthority(event);

    const body = (await useBody(req)) as { id: string };
    const userId = body.id;

    if (!userId) return;

    const user = await User.findOne({ "socialMedia.fb": userId });

    if (!user)
      throw createError({ message: "Can't find the user", statusCode: 404 });

    if (!useUserIsInYearbook(user))
      throw createError({
        message: "Can't toggle show a user who isn't in the yearbook",
        statusCode: 400,
      });

    user.isShown = !user.isShown;

    await user.save();

    await ActionController.create(
      context.user.id,
      `${user.isShown ? "Show" : "Hide"} ${user.name.first} ${
        user.name.second
      } ${user.name.third}.`,
      user._id.toString()
    );

    return user;
  });

  static resetUser = defineEventHandler(async event => {
    const { req, context } = event;
    hasToHaveAuthority(event);

    const body = (await useBody(req)) as { id?: string };
    const userId = body.id;

    if (!userId) return;

    const user = await User.findOne({ "socialMedia.fb": userId });

    if (!user)
      throw createError({ message: "Can't find the user", statusCode: 404 });

    if (user.socialMedia.fb === context.user.fbId)
      throw createError({
        message: "You can't reset yourself",
        statusCode: 400,
      });

    user.username = undefined;
    user.password = undefined;

    await user.save();

    await ActionController.create(
      context.user.id,
      `Reset ${user.name.first} ${user.name.second} ${user.name.third}.`,
      user._id.toString()
    );

    return user;
  });

  static getActivities = defineEventHandler(async event => {
    const { id } = useQuery(event.req) as { id?: string };

    if (!id)
      throw createError({
        message: "You have to provide an id.",
        statusCode: 400,
      });

    const {
      incomingCount: incomingMessagesCount,
      outgoingCount: outgoingMessagesCount,
    } = await MessageController.getUserMessagesCount(id);
    const {
      incomingCount: incomingCloseFriendsCount,
      outgoingCount: outgoingCloseFriendsCount,
    } = await CloseFriendController.getUserCloseFriendsCount(id);

    return {
      incomingCloseFriendsCount,
      incomingMessagesCount,
      outgoingCloseFriendsCount,
      outgoingMessagesCount,
    } as UserActivities;
  });

  /* ===================== Utils ===================== */
  static populateUser(
    userData: CreateUser,
    alreadyExistingUser?: UserInterface
  ) {
    let user;
    if (alreadyExistingUser) {
      user = alreadyExistingUser;

      user.gender = userData.gender;
      user.role = userData.role;
      user.authorityRole = userData.authorityRole || "USER";
      user.quote = userData.quote;
      user.currentJob = userData.currentJob;
    } else
      user = new User({
        ...userData,
        name: {},
        socialMedia: {},
        image: undefined,
      });

    user.name = this.populateName(userData);
    user.image = this.populateImages(userData, alreadyExistingUser);
    user.socialMedia = this.populateSocialMedia(userData);
    user.isShown = this.populateIsShown(userData);

    return user;
  }

  private static populateName(userData: CreateUser) {
    const userName: Partial<UserName> = {};
    (["first", "second", "third", "nickname"] as const).forEach(
      name =>
        // @ts-ignore
        (userName[name] = userData[name === "nickname" ? name : `${name}Name`])
    );
    return userName as UserName;
  }

  private static populateImages(
    userData: CreateUser,
    alreadyExistingUser?: UserInterface
  ) {
    const isInYearbook = useUserIsInYearbook(userData.role);

    if (alreadyExistingUser) {
      if (isInYearbook && (!userData.image || !userData.thumbnail))
        return alreadyExistingUser.image;
      else if (isInYearbook && userData.image && userData.thumbnail) {
        return {
          original: userData.image,
          thumbnail: userData.thumbnail,
        } as UserImage;
      } else return undefined;
    } else {
      if (isInYearbook && userData.image && userData.thumbnail)
        return {
          original: userData.image,
          thumbnail: userData.thumbnail,
        } as UserImage;
      return undefined;
    }
  }

  private static populateSocialMedia(userData: CreateUser) {
    return {
      fb: extractFBId(userData.fb),
      ig: extractIGId(userData.ig),
      twt: extractTWTId(userData.twt),
      yt: extractYTId(userData.yt),
    } as UserSocialMedia;
  }

  private static populateIsShown(userData: CreateUser) {
    const providedIsShown =
      userData.isShown === true || userData.isShown === false;
    if (providedIsShown) return userData.isShown;
    return useUserIsInYearbook(userData.role) ? true : undefined;
  }

  private static shouldRemoveOldImage(
    oldUser: UserInterface,
    newUser: CreateUser
  ): boolean {
    if (!oldUser.image) return false;

    if (!useUserIsInYearbook(newUser.role)) return true;

    if (newUser.image && newUser.thumbnail) return true;
    return false;
  }

  static async validateEditUser(
    newUser: UserInterface,
    oldUser: UserInterface,
    currentUser: JWTUser
  ) {
    await this.validateCreatingUser(newUser, false);
    this.couldUpdateAuthority(newUser, oldUser, currentUser);
  }

  private static couldUpdateAuthority(
    newUser: UserInterface,
    oldUser: UserInterface,
    currentUser: JWTUser
  ) {
    const isNewRole = newUser.authorityRole !== oldUser.authorityRole;
    if (isNewRole) {
      if (
        currentUser.id === oldUser._id &&
        currentUser.authorityRole !== newUser.authorityRole
      )
        throw createError({
          message: "You can't update your authority role.",
          statusCode: 400,
        });

      const authoritiesWithPowers = useUserAuthorityRolePowers();

      if (
        authoritiesWithPowers[newUser.authorityRole] >
        authoritiesWithPowers[currentUser.authorityRole]
      )
        throw createError({
          message:
            "You can't update any user to a role above your authority role.",
          statusCode: 400,
        });
      if (
        authoritiesWithPowers[oldUser.authorityRole] >
        authoritiesWithPowers[currentUser.authorityRole]
      )
        throw createError({
          message:
            "You can't change the authority to any admin above your rank",
          statusCode: 400,
        });
    }
  }

  static async validateCreatingUser(user: UserInterface, checkForImage = true) {
    this.checkIfRequiredFieldsAreProvided(user, checkForImage);

    await this.checkIfDuplicatedFB(user);
    await this.checkIfDuplicatedIG(user);
    await this.checkIfDuplicatedTWT(user);
    await this.checkIfDuplicatedYT(user);
  }

  private static checkIfRequiredFieldsAreProvided(
    user: UserInterface,
    checkForImage = true
  ) {
    const isInYearbook = useUserIsInYearbook(user.role);

    if (!user.name.first)
      throw createError({
        message: "First name must be provided.",
        statusCode: 400,
      });
    if (!user.name.second)
      throw createError({
        message: "Second name must be provided.",
        statusCode: 400,
      });

    if (isInYearbook) {
      if (
        checkForImage &&
        (!user.image || !user.image.original || !user.image.thumbnail)
      )
        throw createError({
          message: "The image must be provided for the user",
          statusCode: 400,
        });

      if (!user.quote)
        throw createError({
          message: "You must provide a quote",
          statusCode: 400,
        });
    }
  }

  static async checkIfDuplicatedFB(user: UserInterface) {
    const sameFBUser = (
      await User.find({
        "socialMedia.fb": { $regex: `^${user.socialMedia.fb}$`, $options: "i" },
      })
    ).find(u => user._id.toString() !== u._id.toString()) as
      | UserInterface
      | undefined;

    if (sameFBUser)
      throw createError({
        message: "This Facebook link is already in use.",
        statusCode: 409,
      });
  }

  static async checkIfDuplicatedIG(user: UserInterface) {
    if (!user.socialMedia.ig) return;

    const sameIGUser = (
      await User.find({
        "socialMedia.ig": { $regex: `^${user.socialMedia.ig}$`, $options: "i" },
      })
    ).find(u => user._id.toString() !== u._id.toString()) as
      | UserInterface
      | undefined;

    if (sameIGUser)
      throw createError({
        message: "This Instagram link is already in use.",
        statusCode: 409,
      });
  }

  static async checkIfDuplicatedTWT(user: UserInterface) {
    if (!user.socialMedia.twt) return;

    const sameTWTUser = (
      await User.find({
        "socialMedia.twt": {
          $regex: `^${user.socialMedia.twt}$`,
          $options: "i",
        },
      })
    ).find(u => user._id.toString() !== u._id.toString()) as
      | UserInterface
      | undefined;

    if (sameTWTUser)
      throw createError({
        message: "This Twitter link is already in use.",
        statusCode: 409,
      });
  }

  static async checkIfDuplicatedYT(user: UserInterface) {
    if (!user.socialMedia.yt) return;

    const sameYTUser = (
      await User.find({
        "socialMedia.yt": { $regex: `^${user.socialMedia.yt}$`, $options: "i" },
      })
    ).find(u => user._id.toString() !== u._id.toString()) as
      | UserInterface
      | undefined;

    if (sameYTUser)
      throw createError({
        message: "This YouTube link is already in use.",
        statusCode: 409,
      });
  }

  private static compareDocuments(
    oldDocument: UserInterface,
    newDocument: UserInterface
  ) {
    const affectedFields = [] as ActionAffectedField[];

    const compare = (prop: string) => {
      const from = useGetObjectValue<string>(oldDocument, prop);
      const to = useGetObjectValue<string>(newDocument, prop);
      const field = prop;
      const bothAreEmpty =
        (from === null || from === undefined || from === "") &&
        (to === null || to === undefined || to === "");

      if (from !== to && !bothAreEmpty)
        affectedFields.push({ field, from, to });
    };

    [
      "name.first",
      "name.second",
      "name.third",
      "name.nickname",

      "image.original",
      "image.thumbnail",

      "socialMedia.fb",
      "socialMedia.ig",
      "socialMedia.twt",
      "socialMedia.yt",

      "authorityRole",
      "role",
      "gender",
      "currentJob",
      "quote",
    ].forEach(compare);

    return affectedFields;
  }
}
