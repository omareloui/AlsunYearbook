import { useAuthStore } from "~~/store/useAuth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  const getHeaders = useAuthHeaders();

  const headers = getHeaders();
  if (!headers.authorization && !headers["x-refresh-token"]) return;

  let finalAccessToken = headers.authorization;
  let finalRefreshToken = headers["x-refresh-token"];

  if (!headers.authorization) {
    const { token, refreshToken } = await authStore.refreshTokens();
    finalAccessToken = `Bearer ${token.body}`;
    finalRefreshToken = refreshToken.body;
    authStore.setTokensOnServer(token, refreshToken);
  }

  const { user } = await $fetch("/api/me", {
    headers: {
      authorization: finalAccessToken!,
      "x-refresh-token": finalRefreshToken!,
    },
  });

  if (!user) return;

  authStore.setUser(user);
});
