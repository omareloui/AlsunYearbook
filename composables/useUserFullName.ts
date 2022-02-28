import { User } from "~~/@types";
import { useCapitalize } from "./useCapitalize";

export function useUserFullName(
  user: User,
  includeThird: boolean = false,
  capitalize: boolean = true
) {
  let name = `${user.name.first} ${user.name.second}`;
  if (includeThird) name += ` ${user.name.third}`;
  return capitalize ? useCapitalize(name) : name;
}
