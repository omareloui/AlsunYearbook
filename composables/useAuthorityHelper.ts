import { UserAuthority } from "~~/@types";
import { useUserAuthorityRolePowers } from "~~/composables/useUserAuthorityRolePowers";

export function useAuthorityHelper() {
  return {
    hasAccess(minRole: UserAuthority, currentRole: UserAuthority) {
      const authoritiesWithPowers = useUserAuthorityRolePowers();
      const requiredPower = authoritiesWithPowers[minRole];
      const currentPower = authoritiesWithPowers[currentRole];

      return currentPower >= requiredPower;
    },
  };
}
