import { CompatibilityEvent } from "h3";

export function hasToBeAuthenticated(event: CompatibilityEvent) {
  if (!event.context.user)
    throw createError({
      message: "You have to be authenticated.",
      statusCode: 401,
    });
}
