import { createError } from "h3";
import type { APIRequest, UserAuthority } from "~~/@types";
import { useAuthorityHelper } from "~~/composables/useAuthorityHelper";

export function hasToHaveAuthority(
  req: APIRequest,
  minRole: UserAuthority = "MODERATOR"
) {
  const authorityHelper = useAuthorityHelper();

  if (!req.user || !authorityHelper.hasAccess(minRole, req.user.authorityRole))
    throw createError({
      message: "You're not allowed.",
      statusCode: 403,
    });
}
