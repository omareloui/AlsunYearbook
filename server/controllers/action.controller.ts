import mongoose from "mongoose";

import { Action } from "server/models";
import { hasToHaveAuthority } from "server/policies";

import type { ActionAffectedField, DehydratedAction } from "types";

export class ActionController {
  static getAll = defineEventHandler(event => {
    hasToHaveAuthority(event, "ASSISTANT_TO_ADMIN");
    return Action.find()
      .populate("signature affected.user")
      .sort("-createdAt")
      .exec();
  });

  static create(
    userId: string,
    action: string,
    affectedId?: string,
    affectedFields?: ActionAffectedField[]
  ) {
    const actionData: DehydratedAction = {
      signature: new mongoose.Types.ObjectId(userId),
      action,
      affected: {},
    };

    if (affectedId)
      actionData.affected!.user = new mongoose.Types.ObjectId(affectedId);

    if (affectedFields) actionData.affected!.fields = affectedFields;

    const newAction = new Action(actionData);
    return newAction.save();
  }
}
