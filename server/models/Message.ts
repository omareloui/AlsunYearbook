import mongoose from "mongoose";

import typegoose from "@typegoose/typegoose";
const { prop, getModelForClass } = typegoose;

import { UserClass } from ".";

export class Message {
  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId, required: true })
  public author!: typeof mongoose.Types.ObjectId;

  @prop({ ref: () => UserClass, type: mongoose.Types.ObjectId, required: true })
  public receiver!: typeof mongoose.Types.ObjectId;

  @prop({ type: String, required: true, trim: true })
  public message!: string;

  @prop({ type: Boolean, default: false })
  public isAnonymous!: boolean;

  @prop({ type: Boolean, default: false })
  public isFavorite!: boolean;

  @prop({ type: Boolean, default: false })
  public isRead!: boolean;
}

export default getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});
