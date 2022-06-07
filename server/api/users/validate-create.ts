import { UserController } from "controllers";
import type { CreateUser } from "types";

export default defineEventHandler(async event => {
  const { req } = event;
  const body = (await useBody(req)) as CreateUser;
  const user = UserController.populateUser(body);
  await UserController.validateCreatingUser(user, false);

  return { valid: true };
});
