import type { UserAuthority } from "~~/@types";

export const useUserAuthorityRole = () =>
  [
    "USER",
    "MODERATOR",
    "ASSISTANT_TO_ADMIN",
    "ASSISTANT_ADMIN",
    "ADMIN",
  ] as UserAuthority[];
