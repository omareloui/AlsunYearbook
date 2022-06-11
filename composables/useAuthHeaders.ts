export function useAuthHeaders() {
  return () => {
    const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

    const jwt = useCookie(JWT_NAME).value;
    const refreshToken = useCookie(REFRESH_TOKEN_NAME).value;

    return {
      authorization: jwt ? `Bearer ${jwt}` : undefined,
      "x-refresh-token": refreshToken,
    };
  };
}
