import { User } from "~~/@types";

export function useUserImage(
  user: User,
  imageRes: "thumbnail" | "original" = "thumbnail"
) {
  return user.image ? user.image[imageRes] : "";
}
