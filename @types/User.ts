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
  third: string;
  nickname?: string;
}

export interface User {
  username: string;
  password?: string;
  name: UserName;
  role: UserRole;
  gender: UserGender;
  socialMedia: UserSocialMedia;
  image: UserImage;
  currentJob?: string;
  authorityRole: UserAuthority;
  isShown: boolean;
  quote: string;
}

export interface CreateUser {
  firstName: string;
  secondName: string;
  thirdName: string;
  nickname: string;

  gender: string;
  role: string;

  fb: string;
  ig: string;
  twt: string;
  yt: string;

  image: string;
  thumbnail: string;

  quote: string;
  currentJob: string;
}
