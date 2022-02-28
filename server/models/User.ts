import mongoose from "mongoose";

import typegoose from "@typegoose/typegoose";
const { prop, modelOptions, getModelForClass, Severity } = typegoose;

import {
  UserAuthority,
  UserGender,
  UserImage,
  UserName,
  UserRole,
  UserSocialMedia,
} from "~~/@types";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class User {
  @prop({ type: String, trim: true, lowercase: true })
  public username!: string;

  @prop({ type: String })
  public password!: string;

  @prop({
    type: mongoose.Schema.Types.Mixed,
    required: true,
  })
  public name!: UserName;

  @prop({ type: String, required: true })
  public gender!: UserGender;

  @prop({ type: mongoose.Schema.Types.Mixed, required: true })
  public image: UserImage;

  @prop({ type: String, required: true, trim: true })
  public quote!: string;

  @prop({ type: String, trim: true })
  public currentJob?: string;

  @prop({ type: mongoose.Schema.Types.Mixed, required: true })
  public socialMedia!: UserSocialMedia;

  @prop({ type: String, default: "STUDENT" as UserRole })
  public role!: UserRole;

  @prop({ type: String, default: "USER" as UserAuthority })
  public authorityRole!: UserAuthority;

  @prop({ type: Boolean, default: true })
  public isShown!: boolean;
}

export default getModelForClass(User);
