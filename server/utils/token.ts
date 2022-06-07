import jwt from "jsonwebtoken";
import { createError } from "h3";

import { User } from "server/models";

import type {
  User as UserInterface,
  Token,
  RefreshTokenContent,
  JWTContent,
  JWTUser,
} from "types";
import { config } from "server/config";

const {
  tokens: { jwt: jwtConfig, refresh: refreshTokenConfig },
} = config;

export function createTokens(user: UserInterface): [Token, Token] {
  const token = jwt.sign(
    {
      user: {
        id: user._id.toString(),
        fbId: user.socialMedia.fb,
        role: user.role,
        authorityRole: user.authorityRole,
      },
    } as JWTContent,
    jwtConfig.secret!,
    { expiresIn: jwtConfig.expiration }
  );

  const refreshToken = jwt.sign(
    { user: { id: user._id.toString() } } as RefreshTokenContent,
    `${refreshTokenConfig.secret}${user.password}`,
    {
      expiresIn: refreshTokenConfig.expiration,
    }
  );

  return [
    { body: token, expiration: jwtConfig.expiration },
    { body: refreshToken, expiration: refreshTokenConfig.expiration },
  ];
}

export function verifyToken<T extends RefreshTokenContent | JWTContent>(
  token: string,
  secret: string
): T {
  return jwt.verify(token, secret) as T;
}

export function decodeToken<T extends RefreshTokenContent | JWTContent>(
  token: string
): T {
  return jwt.decode(token) as T;
}

export async function refreshTokens(refreshToken: string) {
  let userId: string;

  try {
    const {
      user: { id },
    } = decodeToken<RefreshTokenContent>(refreshToken);
    userId = id;
  } catch (err) {
    throw createError({ message: "Invalid refresh token.", statusCode: 401 });
  }

  if (!userId)
    throw createError({ message: "Invalid refresh token.", statusCode: 401 });

  const user = await User.findOne({ _id: userId });

  if (!user)
    throw createError({
      message: "Can't find the token user.",
      statusCode: 401,
    });

  const refreshSecret = `${refreshTokenConfig.secret}${user.password}`;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    throw createError({ message: "Invalid token.", statusCode: 401 });
  }

  const [newToken, newRefreshToken] = createTokens(user);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user: {
      id: user._id.toString(),
      fbId: user.socialMedia.fb,
      role: user.role,
      authorityRole: user.authorityRole,
    },
  } as { token: Token; refreshToken: Token; user: JWTUser };
}
