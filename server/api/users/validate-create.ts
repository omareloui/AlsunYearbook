import { useBody } from "h3";

import { UserController } from "~~/server/controllers/user.controller";
import type { APIFunction, CreateUser } from "~~/@types";

const validate: APIFunction = async (req, _res) => {
  const body = (await useBody(req)) as CreateUser;
  const user = UserController.populateUserFromCreationData(body);
  await UserController.validateCreatingUser(user);

  return { valid: true };
};

export default validate;
