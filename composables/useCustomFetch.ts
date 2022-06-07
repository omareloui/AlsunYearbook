export async function useCustomFetch<T>(
  ...params: Parameters<typeof useFetch>
): Promise<T> {
  const { data, error } = await useTokenedFetch(...params);

  if (error.value) {
    throw new Error(
      error.value === true
        ? "You have to make at least one change and try again."
        : useParseError(error)
    );
  }

  return data.value;
}
