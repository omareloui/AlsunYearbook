import { User, UserRole } from "~~/@types";

export function useUserIsInYearbook(userOrUserRole: User | UserRole) {
  let role: UserRole;

  if (typeof userOrUserRole === "string") role = userOrUserRole;
  else role = userOrUserRole.role;

  return !!role.match(/^(STUDENT|PROFESSOR)$/);
}
