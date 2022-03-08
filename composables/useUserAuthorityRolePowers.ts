import type { UserAuthority } from "~~/@types";

export const useUserAuthorityRolePowers = () =>
  ({
    USER: 10,
    MODERATOR: 20,
    ASSISTANT_TO_ADMIN: 30,
    ASSISTANT_ADMIN: 40,
    ADMIN: 100,
  } as Record<UserAuthority, number>);
