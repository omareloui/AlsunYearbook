import { useUserFullName } from "./useUserFullName";
import { useUserImage } from "./useUserImage";
import { useUserUsername } from "./useUserUsername";
import { useUserHasAuthority } from "./useUserHasAuthority";
import { useUserIsInYearbook } from "./useUserIsInYearbook";

import type { imageResolution } from "~~/@types";

interface Options {
  includeThirdName?: boolean;
  capitalizeName?: boolean;
  imageRes?: imageResolution;
}

export function useUserHelpers(
  user,
  { includeThirdName, capitalizeName, imageRes }: Options = {
    includeThirdName: false,
    capitalizeName: true,
    imageRes: "thumbnail",
  }
) {
  return {
    fullName: useUserFullName(user, includeThirdName, capitalizeName),
    image: useUserImage(user, imageRes),
    username: useUserUsername(user),
    hasAuthority: useUserHasAuthority(user),
    isInYearbook: useUserIsInYearbook(user),
  };
}
