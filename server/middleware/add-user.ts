import { IncomingMessage } from "h3";
import type { JWTContent } from "types";

import { AuthController } from "controllers";

import { useConstants } from "~~/composables/useConstants";

import { verifyToken, refreshTokens } from "server/utils";
import { config } from "server/config";

function getToken(
  cookies: Record<string, string>,
  req: IncomingMessage,
  isRefreshToken = false
) {
  const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();
  const fromCookies = cookies[isRefreshToken ? REFRESH_TOKEN_NAME : JWT_NAME];
  if (fromCookies) return fromCookies;

  const fromHeaders = isRefreshToken
    ? (req.headers["x-refresh-token"] as string | undefined)
    : (req.headers["authorization"] as string | undefined)?.split("Bearer ")[1];
  return fromHeaders || "";
}

function verify(token: string) {
  try {
    return verifyToken<JWTContent>(token, config.tokens.jwt.secret);
  } catch (e) {
    return false;
  }
}

// async function getFromRefreshToken(
//   cookies: Record<string, string>,
//   req: IncomingMessage
// ) {
//   const refreshToken = getToken(cookies, req, true);

//   if (!refreshToken) return false;
//   try {
//     const newTokens = await refreshTokens(refreshToken);
//     return newTokens;
//   } catch (e) {
//     return false;
//   }
// }

export default defineEventHandler(async event => {
  const { req, context } = event;
  const cookies = useCookies(event);
  const token = getToken(cookies, req);
  const jwtVerificationResult = verify(token);

  if (jwtVerificationResult) context.user = jwtVerificationResult.user;

  // else {
  //   const newTokens = await getFromRefreshToken(cookies, req);
  //   if (!newTokens) AuthController.removeCookies(event);
  //   else {
  //     AuthController.setCookies(
  //       event,
  //       newTokens.token.body,
  //       newTokens.refreshToken.body
  //     );
  //     context.user = newTokens.user;
  //   }
  // }
});
