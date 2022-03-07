import { useCookie } from "h3";

import type { APIFunction, JWTContent } from "~~/@types";

import { AuthController } from "~~/server/controllers";

import { verifyToken, refreshTokens } from "~~/server/utils";
import { useConstants } from "~~/composables/useConstants";

import { config } from "~~/server/config";

const addUser: APIFunction = async (req, res) => {
  const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

  const token = useCookie(req, JWT_NAME) as string | undefined;

  if (token) {
    try {
      const { user } = verifyToken<JWTContent>(
        token as string,
        config.tokens.jwt.expiration
      );
      req.user = user;
    } catch (e) {
      const refreshToken = useCookie(req, REFRESH_TOKEN_NAME) as
        | string
        | undefined;

      if (!refreshToken) return;

      const newTokens = await refreshTokens(refreshToken);

      if (newTokens?.token && newTokens?.refreshToken) {
        AuthController.setCookies(
          res,
          newTokens.token.body,
          newTokens.refreshToken.body
        );
      }

      req.user = newTokens.user;
    }
  }
};

export default addUser;
