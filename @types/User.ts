import { Document } from "mongoose";

export type UserRole = "STUDENT" | "PROFESSOR" | "SPECIAL_MENTION" | "VISITOR";

export type UserAuthority =
  | "ADMIN"
  | "ASSISTANT_ADMIN"
  | "ASSISTANT_TO_ADMIN"
  | "MODERATOR"
  | "USER";

export type UserGender = "MALE" | "FEMALE";

export type UserImage = { original: string; thumbnail: string };

export interface UserSocialMedia {
  fb: string;
  ig?: string;
  twt?: string;
  yt?: string;
}

export interface UserName {
  first: string;
  second: string;
  third?: string;
  nickname?: string;
}

export interface DehydratedUser {
  username?: string;
  password?: string;

  name: UserName;

  socialMedia: UserSocialMedia;

  image?: UserImage;

  gender: UserGender;
  role: UserRole;
  authorityRole: UserAuthority;

  quote?: string;
  currentJob?: string;

  isShown?: boolean;
}

export interface User extends DehydratedUser, Document {}

export interface CreateUser {
  _id?: string;

  firstName: string;
  secondName: string;
  thirdName?: string;
  nickname?: string;

  gender: UserGender;
  role: UserRole;
  authorityRole?: UserAuthority;

  fb: string;
  ig?: string;
  twt?: string;
  yt?: string;

  image?: string;
  thumbnail?: string;

  quote?: string;
  currentJob?: string;

  isShown?: boolean;
}

export interface UserActivities {
  outgoingMessagesCount: number;
  incomingMessagesCount: number;
  incomingCloseFriendsCount: number;
  outgoingCloseFriendsCount: number;
}
