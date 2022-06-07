import mongoose from "mongoose";

import { DehydratedMessage } from "types";

const { Schema, model } = mongoose;

const MessageSchema = new Schema<DehydratedMessage>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true, trim: true },
    isAnonymous: { type: Boolean, default: false },
    isFavorite: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = model<DehydratedMessage>("Message", MessageSchema);
