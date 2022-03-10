import { User } from ".";

export interface Message {
  _id: string;
  author?: User;
  receiver: User;
  message: string;
  isAnonymous: boolean;
  isFavorite: boolean;
  isRead: boolean;
  createdAt: Date;
}

export interface SendMessage {
  receiver: string;
  message: string;
  isAnonymous: boolean;
}
