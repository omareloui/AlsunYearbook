import { Document, Types } from "mongoose";
import { User } from "./User";

export interface DehydratedCloseFriend {
  user: Types.ObjectId;
  closeFriend: Types.ObjectId;
}

export interface CloseFriend extends Document {
  user: User;
  closeFriend: User;
}
