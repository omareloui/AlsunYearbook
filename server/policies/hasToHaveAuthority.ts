import { createError } from "h3";
import type { APIRequest } from "~~/@types";
import { useUserHasAuthority } from "~~/composables/useUserHasAuthority";

export function hasToHaveAuthority(req: APIRequest) {
  if (!req.user || !useUserHasAuthority(req.user.authorityRole))
    throw createError({
      message: "You're not allowed.",
      statusCode: 403,
    });
}
