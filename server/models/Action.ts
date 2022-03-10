import mongoose from "mongoose";

import typegoose from "@typegoose/typegoose";
const { prop, getModelForClass, modelOptions, Severity } = typegoose;

import { UserClass } from ".";
import { ActionAffectedField } from "~~/@types";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Action {
  @prop({ type: String, required: true })
  public action!: string;

  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId, required: true })
  public signature!: typeof mongoose.Types.ObjectId;

  @prop({ ref: () => UserClass, type: mongoose.Schema.Types.Mixed })
  public affected: {
    user: typeof mongoose.Types.ObjectId;
    fields?: ActionAffectedField[];
  };
}

export default getModelForClass(Action, {
  schemaOptions: { timestamps: true },
});
