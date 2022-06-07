import mongoose from "mongoose";
import { DehydratedCloseFriend } from "types";

const { Schema, model } = mongoose;

const CloseFriendSchema = new Schema<DehydratedCloseFriend>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  closeFriend: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const CloseFriend = model<DehydratedCloseFriend>(
  "CloseFriend",
  CloseFriendSchema
);
