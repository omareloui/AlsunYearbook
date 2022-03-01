import { useBody } from "h3";

import { UserController } from "~~/server/controllers";
import type { APIFunction, CreateUser } from "~~/@types";

const validate: APIFunction = async (req, _res) => {
  const body = (await useBody(req)) as CreateUser;
  const user = UserController.populateUser(body);
  await UserController.validateEditUser(user);
  return { valid: true };
};

export default validate;
