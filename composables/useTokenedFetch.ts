import { useAuthHeaders } from "~~/composables/useAuthHeaders";
import { useAuthStore } from "~~/store/useAuth";

export async function useTokenedFetch(...params: Parameters<typeof $fetch>) {
  const getHeaders = useAuthHeaders();

  const headers = getHeaders();

  let finalAccessToken = headers.authorization;
  let finalRefreshToken = headers["x-refresh-token"];

  if (!headers.authorization && headers["x-refresh-token"]) {
    const authStore = useAuthStore();
    const { token, refreshToken } = await authStore.refreshTokens();
    finalAccessToken = `Bearer ${token.body}`;
    finalRefreshToken = refreshToken.body;
    authStore.setTokens(token, refreshToken);
  }

  return $fetch(params[0], {
    ...params[1],
    headers: {
      ...params[1]?.headers,
      ...(finalAccessToken ? { authorization: finalAccessToken } : {}),
      ...(finalRefreshToken ? { "x-refresh-token": finalRefreshToken } : {}),
    },
  });
}
