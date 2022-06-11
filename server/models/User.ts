import mongoose from "mongoose";

const { Schema, model } = mongoose;

import { DehydratedUser } from "types";

const UserSchema = new Schema<DehydratedUser>({
  username: { type: String, trim: true },
  password: { type: String },
  name: {
    first: { type: String, minlength: 3, trim: true, required: true },
    second: { type: String, minlength: 3, trim: true, required: true },
    third: { type: String, trim: true },
    nickname: { type: String, trim: true },
  },
  gender: {
    type: String,
    enum: { values: ["MALE", "FEMALE"], message: "Invalid gender value." },
    required: true,
  },
  image: {
    original: { type: String, trim: true },
    thumbnail: { type: String, trim: true },
  },
  role: {
    type: String,
    enum: {
      values: ["STUDENT", "PROFESSOR", "SPECIAL_MENTION", "VISITOR"],
      message: "Invalid role value.",
    },
    required: true,
    default: "STUDENT",
  },
  socialMedia: {
    fb: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    twt: { type: String, unique: true, trim: true },
    ig: { type: String, unique: true, trim: true },
    yt: { type: String, unique: true, trim: true },
  },
  currentJob: { type: String, trim: true },
  quote: { type: String, trim: true },
  authorityRole: {
    type: String,
    enum: {
      values: [
        "ADMIN",
        "ASSISTANT_ADMIN",
        "ASSISTANT_TO_ADMIN",
        "MODERATOR",
        "USER",
      ],
      message: "Invalid authority role value.",
    },
    required: true,
    default: "USER",
  },
  isShown: { type: Boolean, default: true },
});

export const User = model<DehydratedUser>("User", UserSchema);
