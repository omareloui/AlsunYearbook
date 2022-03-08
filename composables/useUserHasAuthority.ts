import { User } from "~~/@types";

export function useUserHasAuthority(userOrAuthority: User | string) {
  const authority =
    typeof userOrAuthority === "string"
      ? userOrAuthority
      : userOrAuthority.authorityRole;

  return authority.match(/^(MODERATOR|(ASSISTANT_(TO_)?)?ADMIN)$/);
}
