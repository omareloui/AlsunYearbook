import { useBody, createError, useQuery } from "h3";
import type { APIFunction, CreateUser, User as UserInterface } from "~~/@types";

import { User } from "../models";
import {
  extractFBId,
  extractIGId,
  extractTWTId,
  extractYTId,
} from "~~/server/utils";

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

    const user = this.populateUserFromCreationData(body);

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

  // Utils
  static populateUserFromCreationData(userData: CreateUser) {
    const user = new User({
      name: {},
      socialMedia: {},
      ...userData,
      image: {},
    });

    (["first", "second", "third", "nickname"] as const).forEach(
      name =>
        (user.name[name] =
          userData[name === "nickname" ? name : `${name}Name`].toLowerCase())
    );

    user.image.original = userData.image;
    user.image.thumbnail = userData.thumbnail;

    user.socialMedia.fb = extractFBId(userData.fb);
    user.socialMedia.ig = extractIGId(userData.ig);
    user.socialMedia.twt = extractTWTId(userData.twt);
    user.socialMedia.yt = extractYTId(userData.yt);
    return user;
  }

  static async validateCreatingUser(user: UserInterface) {
    await this.checkIfDuplicatedName(user);
    await this.checkIfDuplicatedFB(user);
    await this.checkIfDuplicatedIG(user);
    await this.checkIfDuplicatedTWT(user);
    await this.checkIfDuplicatedYT(user);
  }

  static async checkIfDuplicatedName(user: UserInterface) {
    const sameNameUser = await User.findOne({
      "name.first": user.name.first.toLowerCase(),
      "name.second": user.name.second.toLowerCase(),
      "name.third": user.name.third.toLowerCase(),
    });
    if (sameNameUser)
      throw createError({
        message: "A user with the same name already exists.",
        statusCode: 400,
      });
  }

  static async checkIfDuplicatedFB(user: UserInterface) {
    const sameFBUser = await User.findOne({
      "socialMedia.fb": { $regex: `^${user.socialMedia.fb}$`, $options: "i" },
    });

    if (sameFBUser)
      throw createError({
        message: "This Facebook link is already in use.",
        statusCode: 400,
      });
  }

  static async checkIfDuplicatedIG(user: UserInterface) {
    if (!user.socialMedia.ig) return;

    const sameIGUser = await User.findOne({
      "socialMedia.ig": { $regex: `^${user.socialMedia.ig}$`, $options: "i" },
    });
    if (sameIGUser)
      throw createError({
        message: "This Instagram link is already in use.",
        statusCode: 400,
      });
  }

  static async checkIfDuplicatedTWT(user: UserInterface) {
    if (!user.socialMedia.twt) return;

    const sameTWTUser = await User.findOne({
      "socialMedia.twt": { $regex: `^${user.socialMedia.twt}$`, $options: "i" },
    });
    if (sameTWTUser)
      throw createError({
        message: "This Twitter link is already in use.",
        statusCode: 400,
      });
  }

  static async checkIfDuplicatedYT(user: UserInterface) {
    if (!user.socialMedia.yt) return;

    const sameYTUser = await User.findOne({
      "socialMedia.yt": { $regex: `^${user.socialMedia.yt}$`, $options: "i" },
    });
    if (sameYTUser)
      throw createError({
        message: "This YouTube link is already in use.",
        statusCode: 400,
      });
  }
}
