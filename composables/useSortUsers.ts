import type { User } from "~~/@types";

export function useSortUsers(users: User[]) {
  return users.sort((a, b) =>
    useUserFullName(a, true).toLowerCase() >
    useUserFullName(b, true).toLowerCase()
      ? 1
      : -1
  );
}
