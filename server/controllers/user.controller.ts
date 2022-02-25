import type { APIFunction } from "~~/@types";

import { User } from "../models";

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

  static create: APIFunction = async (_req, _res) => {
    console.log("To be added...");
    // const users = await User.find().exec();
    // return users;
  };
}
