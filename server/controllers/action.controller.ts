import mongoose from "mongoose";

import { Action } from "~~/server/models";
import { hasToHaveAuthority } from "~~/server/policies";

import type {
  APIFunction,
  Action as ActionInterface,
  ActionAffectedField,
  ActionAffected,
} from "~~/@types";

export class ActionController {
  static getAll: APIFunction = req => {
    hasToHaveAuthority(req, "ASSISTANT_TO_ADMIN");
    return Action.find()
      .populate("signature affected.user")
      .sort("-createdAt")
      .exec();
  };

  static create(
    userId: string,
    action: string,
    affectedId?: string,
    affectedFields?: ActionAffectedField[]
  ) {
    const actionData = {
      signature: new mongoose.Types.ObjectId(userId),
      action,
      affected: {} as {
        user?: mongoose.Types.ObjectId;
        fields?: ActionAffectedField[];
      },
    };

    if (affectedId)
      actionData.affected.user = new mongoose.Types.ObjectId(affectedId);

    if (affectedFields) actionData.affected.fields = affectedFields;

    const newAction = new Action(actionData);
    return newAction.save();
  }

  /* ==== Utils ==== */
  private static populate(doc) {
    return Action.populate(
      doc,
      "signature affected"
    ) as Promise<unknown> as Promise<ActionInterface>;
  }
}
