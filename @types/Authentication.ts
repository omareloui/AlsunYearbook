import { User, UserAuthority } from ".";

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

export interface JWTUser {
  id: string;
  fbId: string;
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
