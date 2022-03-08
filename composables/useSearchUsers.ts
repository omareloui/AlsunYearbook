import type { User } from "~~/@types";

export function useSearchUsers(users: User[], query: string) {
  query = query.toLowerCase();

  if (!query) return users;

  const searchResult = users
    .map(u => {
      const user = u as User & { fullName: string };
      user.fullName = useUserFullName(u, true).toLowerCase();
      user.name.nickname = u.name.nickname?.toLowerCase();
      return user;
    })
    .filter((user: User & { fullName: string }) => {
      const { nickname } = user.name;

      const fullNameSearch = user.fullName.search(query) > -1;
      const nicknameSearch = nickname && nickname.search(query) > -1;

      return fullNameSearch || nicknameSearch;
    })
    .sort(
      (a: User & { fullName: string }, b: User & { fullName: string }) =>
        a.fullName.search(query) - b.fullName.search(query)
    );

  return searchResult;
}
