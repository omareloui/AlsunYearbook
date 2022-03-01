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

  static edit: APIFunction = async req => {
    const body = (await useBody(req)) as CreateUser;

    const oldUser = await User.findOne({ "socialMedia.fb": body.fb }).exec();
    if (!oldUser)
      throw createError({
        message: "Can't find the user to update",
        statusCode: 404,
      });

    const user = UserController.populateUser(body, oldUser as UserInterface);
    await UserController.validateEditUser(user);

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
  static populateUser(
    userData: CreateUser,
    alreadyExistingUser?: UserInterface
  ) {
    let user;
    if (alreadyExistingUser) {
      user = alreadyExistingUser;

      user.gender = userData.gender;
      user.role = userData.role;
      user.authorityRole = userData.authorityRole;
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

  static populateName(userData: CreateUser) {
    const userName = {};
    (["first", "second", "third", "nickname"] as const).forEach(
      name =>
        (userName[name] = userData[name === "nickname" ? name : `${name}Name`])
    );
    return userName as UserName;
  }

  static populateImages(
    userData: CreateUser,
    alreadyExistingUser?: UserInterface
  ) {
    const isInYearbook = useUserIsInYearbook(userData.role);

    if (alreadyExistingUser) {
      if (isInYearbook && (!userData.image || !userData.thumbnail))
        return alreadyExistingUser.image;
      else if (isInYearbook && userData.image && userData.thumbnail)
        // TODO: REMOVE THE OLD IMAGES IN THIS CASE
        return {
          original: userData.image,
          thumbnail: userData.thumbnail,
        } as UserImage;
      // TODO: REMOVE THE OLD IMAGES IF THEY EXISTED FROM A USER CHANGING FROM YEARBOOK TO NON
      else return undefined;
    } else {
      if (isInYearbook && userData.image && userData.thumbnail)
        return {
          original: userData.image,
          thumbnail: userData.thumbnail,
        } as UserImage;
      return undefined;
      // TODO: REMOVE THE OLD IMAGES IF THEY EXISTED FROM A USER CHANGING FROM YEARBOOK TO NON
    }
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

  static async validateEditUser(newUserData: UserInterface) {
    // const oldUser = await User.find({ _id: newUserData._id });

    await this.validateCreatingUser(newUserData, false);

    // TODO: validate on updating an authRole the level of authority of the doer
  }

  static async validateCreatingUser(user: UserInterface, checkForImage = true) {
    this.checkIfRequiredFieldsAreProvided(user, checkForImage);

    await this.checkIfDuplicatedFB(user);
    await this.checkIfDuplicatedIG(user);
    await this.checkIfDuplicatedTWT(user);
    await this.checkIfDuplicatedYT(user);
  }

  static checkIfRequiredFieldsAreProvided(
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
