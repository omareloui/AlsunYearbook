import { useBody, createError, useQuery } from "h3";
import type {
  APIFunction,
  CreateUser,
  User as UserInterface,
  UserImage,
  UserName,
  UserSocialMedia,
} from "~~/@types";

import { User } from "../models";
import {
  extractFBId,
  extractIGId,
  extractTWTId,
  extractYTId,
} from "~~/server/utils";
import { useUserIsInYearbook } from "~~/composables/useUserIsInYearbook";
import { useRegExHelpers } from "~~/composables/useRegExHelpers";

const regexHelpers = useRegExHelpers();
const ID_LENGTH = 24;

export class UserController {
  static getAll: APIFunction = async () => {
    const users = await User.find()
      .sort([
        ["name.first", 1],
        ["name.second", 1],
        ["name.third", 1],
      ])
      .exec();

    return users;
  };

  static create: APIFunction = async (req, _res) => {
    const body = (await useBody(req)) as CreateUser;

    const user = this.populateUser(body);

    await this.validateCreatingUser(user);

    // TODO:
    // Create the action and the professor data if he is one
    // await Action.create({
    //   signature: req.user.id,
    //   action: `Add user ${newUser.name.first} ${newUser.name.second} ${newUser.name.third}, ${
    //     newUser.gender === "FEMALE" ? "her" : "his"
    //   } id is ${newUser.id}.`
    // })

    // TODO:
    // Create the professor record if s/he's one
    // if (userData.role === "PROFESSOR") {
    //   await ProfessorData.create({ user: newUser.id, yearsAndSubjects: userData.yearsAndSubjects })
    // }

    await user.save();

    return user;
  };

  static getUser: APIFunction = async req => {
    const query = useQuery(req);
    const userId = query.id as string | undefined;
    if (!userId) return;

    const user = await User.findOne({ "socialMedia.fb": userId });

    if (!user)
      return createError({ message: "Can't find the user", statusCode: 404 });

    return user;
  };

  static toggleShow: APIFunction = async req => {
    const body = (await useBody(req)) as { id: string };
    const userId = body.id;

    if (!userId) return;

    const user = await User.findOne({ "socialMedia.fb": userId });

    if (!user)
      return createError({ message: "Can't find the user", statusCode: 404 });

    if (!useUserIsInYearbook(user))
      return createError({
        message: "Can't toggle show a user who isn't in the yearbook",
        statusCode: 400,
      });

    user.isShown = !user.isShown;

    await user.save();

    // TODO: add action

    return user;
  };

  // Utils
  static populateUser(userData: CreateUser) {
    const user = new User({
      ...userData,
      name: {},
      socialMedia: {},
      image: undefined,
    });

    user.name = this.populateName(userData);
    user.image = this.populateImages(userData);
    user.socialMedia = this.populateSocialMedia(userData);
    user.isShown = this.populateIsShown(userData);

    return user;
  }

  static populateName(userData: CreateUser) {
    const userName = {};
    (["first", "second", "third", "nickname"] as const).forEach(
      name =>
        (userName[name] = userData[name === "nickname" ? name : `${name}Name`])
    );
    return userName as UserName;
  }

  static populateImages(userData: CreateUser) {
    if (
      useUserIsInYearbook(userData.role) &&
      userData.image &&
      userData.thumbnail
    ) {
      return {
        original: userData.image,
        thumbnail: userData.thumbnail,
      } as UserImage;
    }
    return undefined;
  }

  static populateSocialMedia(userData: CreateUser) {
    return {
      fb: extractFBId(userData.fb),
      ig: extractIGId(userData.ig),
      twt: extractTWTId(userData.twt),
      yt: extractYTId(userData.yt),
    } as UserSocialMedia;
  }

  static populateIsShown(userData: CreateUser) {
    const providedIsShown = !(
      userData.isShown === null || userData.isShown === undefined
    );

    if (providedIsShown) return userData.isShown;
    return useUserIsInYearbook(userData.role) ? true : undefined;
  }

  static async validateUpdateUser(newUserData: UserInterface) {
    // const oldUser = await User.find({ _id: newUserData._id });

    await this.validateCreatingUser(newUserData, false);

    // TODO: validate on updating an authRole
  }

  static async validateCreatingUser(user: UserInterface, checkForImage = true) {
    await this.checkIfDuplicatedFB(user);
    await this.checkIfDuplicatedIG(user);
    await this.checkIfDuplicatedTWT(user);
    await this.checkIfDuplicatedYT(user);

    this.checkIfYearbookUserHasAllData(user, checkForImage);
  }

  static checkIfYearbookUserHasAllData(
    user: UserInterface,
    checkForImage = true
  ) {
    if (!useUserIsInYearbook(user)) return;

    if (checkForImage && (!user.image?.original || !user.image?.thumbnail))
      throw createError({
        message: "The user must have an image.",
        statusCode: 400,
      });

    if (!user.quote)
      throw createError({
        message: "The user must have a quote.",
        statusCode: 400,
      });
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
        statusCode: 400,
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
        statusCode: 400,
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
        statusCode: 400,
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
        statusCode: 400,
      });
  }
}
