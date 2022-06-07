import { User } from "server/models";
import { UserController } from "controllers";
import { hasToHaveAuthority } from "server/policies";
import { useCloneObject } from "~~/composables/useCloneObject";

import type { CreateUser } from "types";

export default defineEventHandler(async event => {
  const { req, context } = event;
  hasToHaveAuthority(event);

  const body = (await useBody(req)) as CreateUser;
  const oldUser = await User.findOne({ _id: body._id }).exec();
  if (!oldUser)
    throw createError({
      message: "Can't find the user to update",
      statusCode: 404,
    });

  const clonedOldUser = useCloneObject(oldUser);

  const user = UserController.populateUser(body, oldUser);
  await UserController.validateEditUser(user, clonedOldUser, context.user);

  return { valid: true };
});
