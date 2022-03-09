import { User, UserAuthority, UserRole } from ".";

export type SignType = "in" | "up";

export interface Token {
  body: string;
  expiration: Date | string;
}

export interface Authentication {
  user: User;
  token: Token;
  refreshToken: Token;
}

export interface UpdateMe {
  username: string;
  oldPassword?: string;
  newPassword?: string;
}

export interface JWTUser {
  id: string;
  fbId: string;
  role: UserRole;
  authorityRole: UserAuthority;
}

export interface JWTContent {
  user: JWTUser;
}

export interface RefreshTokenUser {
  id: string;
}

export interface RefreshTokenContent {
  user: RefreshTokenUser;
}
