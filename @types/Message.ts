import { Types, Document } from "mongoose";
import { User } from ".";

export interface DehydratedMessage {
  author?: Types.ObjectId;
  receiver: Types.ObjectId;
  message: string;
  isAnonymous: boolean;
  isFavorite: boolean;
  isRead: boolean;
}

export interface Message extends Document {
  author?: User;
  receiver: User;
  message: string;
  isAnonymous: boolean;
  isFavorite: boolean;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendMessage {
  receiver: string;
  message: string;
  isAnonymous: boolean;
}
