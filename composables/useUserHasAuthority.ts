import { User } from "~~/@types";

export function useUserHasAuthority(user: User) {
  return user.authorityRole !== "USER";
}
