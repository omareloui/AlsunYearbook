import { createError, CompatibilityEvent } from "h3";
import type { UserAuthority } from "~~/@types";
import { useAuthorityHelper } from "~~/composables/useAuthorityHelper";

export function hasToHaveAuthority(
  event: CompatibilityEvent,
  minRole: UserAuthority = "MODERATOR"
) {
  const { user } = event.context;
  const authorityHelper = useAuthorityHelper();

  if (!user || !authorityHelper.hasAccess(minRole, user.authorityRole))
    throw createError({
      message: "You're not allowed.",
      statusCode: 403,
    });
}
