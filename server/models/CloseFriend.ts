import mongoose from "mongoose";

import typegoose from "@typegoose/typegoose";
const { prop, getModelForClass } = typegoose;

import { UserClass } from ".";

export class CloseFriend {
  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId })
  public user: typeof mongoose.Types.ObjectId;

  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId })
  public closeFriend: typeof mongoose.Types.ObjectId;
}

export default getModelForClass(CloseFriend);
