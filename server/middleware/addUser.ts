import { useCookie } from "h3";

import type { APIFunction, JWTContent } from "~~/@types";

import { AuthController } from "~~/server/controllers";

import { verifyToken, refreshTokens } from "~~/server/utils";
import { useConstants } from "~~/composables/useConstants";

import { connect as connectDB } from "~~/server/db";

import { config } from "~~/server/config";

const addUser: APIFunction = async (req, res) => {
  console.log("First thing on the middleware...");

  await connectDB();

  const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

  const token = useCookie(req, JWT_NAME) || "";

  try {
    const { user } = verifyToken<JWTContent>(
      token,
      config.tokens.jwt.expiration
    );
    req.user = user;
  } catch (e) {
    const refreshToken = useCookie(req, REFRESH_TOKEN_NAME) || "";

    if (refreshToken) {
      try {
        const newTokens = await refreshTokens(refreshToken);

        AuthController.setCookies(
          res,
          newTokens.token.body,
          newTokens.refreshToken.body
        );

        req.user = newTokens.user;
      } catch (e) {
        AuthController.removeCookies(res);
      }
    }
  }
};

export default addUser;
