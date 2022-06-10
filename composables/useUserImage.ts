import { User, imageResolution } from "~~/@types";

export function useUserImage(
  user: User,
  imageRes: imageResolution = "thumbnail"
) {
  return user.image ? user.image[imageRes].replace(/^https?:/, "") : "";
}
