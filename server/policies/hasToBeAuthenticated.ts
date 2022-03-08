import { createError } from "h3";
import type { APIRequest } from "~~/@types";

export function hasToBeAuthenticated(req: APIRequest) {
  if (!req.user)
    throw createError({
      message: "You have to be authenticated.",
      statusCode: 401,
    });
}
