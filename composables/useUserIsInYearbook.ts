import { User, UserRole } from "~~/@types";

export function useUserIsInYearbook<T extends User | UserRole>(
  userOrUserRole: T
) {
  let role: UserRole;

  if (typeof userOrUserRole === "string") role = userOrUserRole;
  else role = userOrUserRole.role;

  return !!role.match(/^(STUDENT|PROFESSOR)$/);
}
