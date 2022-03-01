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

export interface User {
  _id: string;

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

export interface CreateUser {
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
