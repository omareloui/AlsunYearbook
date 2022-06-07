import Cookie from "cookie-universal";

export function useAuthHeaders() {
  return () => {
    const { JWT_NAME, REFRESH_TOKEN_NAME } = useConstants();

    const cookies = Cookie();
    const jwt = cookies.get(JWT_NAME) as string;
    const refreshToken = cookies.get(REFRESH_TOKEN_NAME) as string;

    return {
      ...(jwt && refreshToken
        ? { authorization: `Bearer ${jwt}`, "x-refresh-token": refreshToken }
        : {}),
    };
  };
}
