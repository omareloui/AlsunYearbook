import { createError } from "h3";
import type { APIRequest } from "~~/@types";
import { useUserIsInYearbook } from "~~/composables/useUserIsInYearbook";

export function hasToBeInYearbook(req: APIRequest) {
  if (!req.user || !useUserIsInYearbook(req.user.role))
    throw createError({
      message: "You're not allowed.",
      statusCode: 403,
    });
}
