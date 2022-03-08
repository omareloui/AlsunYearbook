import mongoose from "mongoose";

import typegoose from "@typegoose/typegoose";
const { prop, modelOptions, getModelForClass, Severity, Index } = typegoose;

import {
  UserAuthority,
  UserGender,
  UserImage,
  UserName,
  UserRole,
  UserSocialMedia,
} from "~~/@types";

@Index({ "socialMedia.fb": 1 }, { unique: true })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
  @prop({ type: String, trim: true })
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

  @prop({ type: mongoose.Schema.Types.Mixed })
  public image: UserImage;

  @prop({ type: String, trim: true })
  public quote!: string;

  @prop({ type: String, trim: true })
  public currentJob?: string;

  @prop({ type: mongoose.Schema.Types.Mixed, required: true })
  public socialMedia!: UserSocialMedia;

  @prop({ type: String, default: "STUDENT" as UserRole })
  public role!: UserRole;

  @prop({ type: String, default: "USER" as UserAuthority })
  public authorityRole!: UserAuthority;

  @prop({ type: Boolean })
  public isShown!: boolean;
}

export default getModelForClass(User);
