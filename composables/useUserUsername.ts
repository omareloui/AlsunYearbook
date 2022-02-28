import { User } from "~~/@types";

export function useUserUsername(user: User) {
  return user.username || "Not Registered";
}
