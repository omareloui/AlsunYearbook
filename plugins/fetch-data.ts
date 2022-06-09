import { useAuthStore } from "~~/store/useAuth";
import { useYearbookStore } from "~~/store/useYearbook";
import { useMessagesStore } from "~~/store/useMessages";
import { useDashboardStore } from "~~/store/useDashboard";
import { useUsersStore } from "~~/store/useUsers";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const yearbookStore = useYearbookStore();
  const messagesStore = useMessagesStore();
  const dashboardStore = useDashboardStore();
  const usersStore = useUsersStore();

  const { user } = await $fetch("/api/me", { headers: useAuthHeaders()() });

  if (!user) return;

  authStore.setUser(user);

  const { fullPath, params } = useRoute();

  const isYearbookRoute = fullPath.match(/^\/yearbook($|[^/])/);
  if (isYearbookRoute) {
    if (authStore.isInYearbook) await messagesStore.fetchUnread();

    yearbookStore.setSectionOnLoad();
    await yearbookStore.fetchCurrentSection();
    await yearbookStore.fetchMyCloseFriends();
    yearbookStore.setShown();
  }

  const isYearbookUserRoute = fullPath.match(/^\/yearbook\//);
  if (isYearbookUserRoute && params.userId) {
    await yearbookStore.fetchSection("students");
    await yearbookStore.fetchSection("professors");
  }

  const isInboxRoute = fullPath === "/inbox";
  if (isInboxRoute) await messagesStore.fetchInbox();

  const isSentRoute = fullPath === "/sent";
  if (isSentRoute) await messagesStore.fetchSent();

  const isDashboardActionsRoute = fullPath === "/dashboard/actions";
  if (isDashboardActionsRoute) await dashboardStore.fetchActions();

  const isDashboardUsersRoute = fullPath.match(/^\/dashboard\/users/);
  if (isDashboardUsersRoute) await usersStore.fetchUsers();
});
