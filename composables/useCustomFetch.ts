export async function useCustomFetch(...params: Parameters<typeof useFetch>) {
  const { data, error } = await useFetch(...params);

  if (error.value) throw new Error(useParseError(error));

  return data;
}
