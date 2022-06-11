import type { JWTContent } from "types";

import { verifyToken } from "server/utils";
import { config } from "server/config";

function verify(token: string) {
  try {
    return verifyToken<JWTContent>(token, config.tokens.jwt.secret);
  } catch (e) {
    return false;
  }
}

export default defineEventHandler(async event => {
  const { req, context } = event;
  const token = (req.headers["authorization"] as string | undefined)?.split(
    "Bearer "
  )[1];

  if (token) {
    const payload = verify(token);
    if (payload) context.user = payload.user;
  }
});
