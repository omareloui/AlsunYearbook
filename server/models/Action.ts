import mongoose from "mongoose";

import typegoose from "@typegoose/typegoose";
const { prop, getModelForClass } = typegoose;

import { UserClass } from ".";

export class Action {
  @prop({ type: String, required: true })
  public action!: string;

  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId, required: true })
  public signature!: typeof mongoose.Types.ObjectId;

  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId })
  public affected: typeof mongoose.Types.ObjectId;
}

export default getModelForClass(Action, {
  schemaOptions: { timestamps: true },
});
