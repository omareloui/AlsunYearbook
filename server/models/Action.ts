import mongoose from "mongoose";
import { DehydratedAction } from "types";

const { Schema, model } = mongoose;

const ActionSchema = new Schema<DehydratedAction>(
  {
    action: { type: String, required: true },
    signature: { type: Schema.Types.ObjectId, ref: "User", required: true },
    affected: {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      fields: {
        type: [
          {
            _id: false,
            field: { type: String, trim: true },
            from: { type: String, trim: true },
            to: { type: String, trim: true },
          },
        ],
      },
    },
  },
  { timestamps: true }
);

export const Action = model<DehydratedAction>("Action", ActionSchema);
