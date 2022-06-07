export function useTokenedFetch(...params: Parameters<typeof useFetch>) {
  return useFetch(params[0], {
    ...params[1],
    headers: {
      ...params[1]?.headers,
      ...useAuthHeaders()(),
    },
  });
}
