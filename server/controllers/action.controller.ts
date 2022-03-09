import mongoose from "mongoose";

import { Action } from "~~/server/models";
import { hasToHaveAuthority } from "~~/server/policies";

import type { APIFunction, Action as ActionInterface } from "~~/@types";

export class ActionController {
  static getAll: APIFunction = req => {
    hasToHaveAuthority(req, "ASSISTANT_TO_ADMIN");
    return Action.find()
      .populate("signature affected")
      .sort("-createdAt")
      .exec();
  };

  static async create(userId: string, action: string, affectedId?: string) {
    const actionData = {
      signature: new mongoose.Types.ObjectId(userId),
      action,
      affected: undefined,
    };

    if (affectedId)
      actionData.affected = new mongoose.Types.ObjectId(affectedId);

    const newAction = new Action(actionData);
    await newAction.save();
  }

  /* ==== Utils ==== */
  private static populate(doc) {
    return Action.populate(
      doc,
      "signature affected"
    ) as Promise<unknown> as Promise<ActionInterface>;
  }
}
