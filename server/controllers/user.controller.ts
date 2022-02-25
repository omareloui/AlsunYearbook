import type { APIFunction } from "~~/@types";

import { User } from "../models";

export class UserController {
  static getAll: APIFunction = async () => {
    const users = await User.find().exec();
    // TODO: to sort
    return users;
  };

  static create: APIFunction = async (_req, _res) => {
    console.log("To be added...");
    // const users = await User.find().exec();
    // return users;
  };
}
