import jwt from "jsonwebtoken";

import { User } from "~~/server/models";
import type {
  User as UserInterface,
  Token,
  RefreshTokenContent,
  JWTContent,
  JWTUser,
} from "~~/@types";
import { config } from "~~/server/config";

const {
  tokens: { jwt: jwtConfig, refresh: refreshTokenConfig },
} = config;

function createToken(payload, secret, options) {
  return jwt.sign(payload, secret, options);
}

export function createTokens(user: UserInterface): [Token, Token] {
  const token = createToken(
    {
      user: {
        id: user._id.toString(),
        fbId: user.socialMedia.fb,
        authorityRole: user.authorityRole,
      },
    } as JWTContent,
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiration }
  );

  const refreshToken = createToken(
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
    return;
  }

  if (!userId) return;

  const user = await User.findOne({ _id: userId });

  if (!user) return;

  const refreshSecret = `${refreshTokenConfig.secret}${user.password}`;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return;
  }

  const [newToken, newRefreshToken] = createTokens(user);

  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user: {
      id: user._id.toString(),
      fbId: user.socialMedia.fb,
      authorityRole: user.authorityRole,
    },
  } as { token: Token; refreshToken: Token; user: JWTUser };
}
