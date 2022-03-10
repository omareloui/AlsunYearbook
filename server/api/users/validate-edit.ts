import { useBody, createError } from "h3";

import { User } from "~~/server/models";
import { UserController } from "~~/server/controllers";
import { hasToHaveAuthority } from "~~/server/policies";
import { useCloneObject } from "~~/composables/useCloneObject";

import type { APIFunction, CreateUser } from "~~/@types";

const validate: APIFunction = async (req, _res) => {
  hasToHaveAuthority(req);

  const body = (await useBody(req)) as CreateUser;
  const oldUser = await User.findOne({ _id: body._id }).exec();
  if (!oldUser)
    throw createError({
      message: "Can't find the user to update",
      statusCode: 404,
    });

  const clonedOldUser = useCloneObject(oldUser);

  const user = UserController.populateUser(body, oldUser);
  await UserController.validateEditUser(user, clonedOldUser, req.user);

  return { valid: true };
};

export default validate;
