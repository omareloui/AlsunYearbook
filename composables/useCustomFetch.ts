import Cookie from "cookie-universal";

function setHeaders(headers: HeadersInit | undefined) {
  const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

  const cookies = Cookie();
  const jwt = cookies.get(JWT_NAME);
  const refreshToken = cookies.get(REFRESH_TOKEN_NAME);

  return {
    ...headers,
    ...(jwt && refreshToken
      ? { authorization: `Bearer ${jwt}`, "x-refresh-token": refreshToken }
      : {}),
  };
}

export async function useCustomFetch(...params: Parameters<typeof useFetch>) {
  const { data, error } = await useFetch(params[0], {
    ...params[1],
    headers: setHeaders(params[1]?.headers),
  });

  if (error.value) {
    throw new Error(
      error.value === true
        ? "You have to make at least one change and try again."
        : useParseError(error)
    );
  }

  return data.value;
}
