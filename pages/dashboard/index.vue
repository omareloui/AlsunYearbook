<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

useHead({ title: "Dashboard" });

const authStore = useAuthStore();
const authorityHelper = useAuthorityHelper();
</script>

<template>
  <Container tag="main">
    <h1 class="heading">Dashboard</h1>

    <section class="dashboard-cards">
      <DashboardCard to="/dashboard/users" title="users">
        <template #icon>
          <IconUsers />
        </template>
      </DashboardCard>

      <DashboardCard to="/dashboard/statistics" title="statistics">
        <template #icon>
          <IconStatistics />
        </template>
      </DashboardCard>

      <DashboardCard
        v-if="
          authorityHelper.hasAccess(
            'ASSISTANT_TO_ADMIN',
            authStore.user!.authorityRole
          )
        "
        to="/dashboard/actions"
        title="actions"
      >
        <template #icon>
          <IconActions />
        </template>
      </DashboardCard>
    </section>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
}

section.dashboard-cards {
  @include mt(20px);
  @include flex($gap: 30px, $wrap: true, $center: true);
  @include w(fit-content);
  @include mx(auto);
}
</style>
