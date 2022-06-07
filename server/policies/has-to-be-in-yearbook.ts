import { createError, CompatibilityEvent } from "h3";
import { useUserIsInYearbook } from "~~/composables/useUserIsInYearbook";

export function hasToBeInYearbook(event: CompatibilityEvent) {
  const { user } = event.context;
  if (!user || !useUserIsInYearbook(user.role))
    throw createError({
      message: "You're not allowed.",
      statusCode: 403,
    });
}
