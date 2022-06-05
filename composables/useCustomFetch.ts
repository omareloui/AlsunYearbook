export async function useCustomFetch(...params: Parameters<typeof useFetch>) {
  const { data, error } = await useFetch(...params);

  if (error.value) {
    throw new Error(
      error.value === true
        ? "You have to make at least one change and try again."
        : useParseError(error)
    );
  }

  return data.value;
}
