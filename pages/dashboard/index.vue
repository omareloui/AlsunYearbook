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
          <IconUsers color="var(--clr-text-dark)" />
        </template>
      </DashboardCard>

      <DashboardCard to="/dashboard/statistics" title="statistics">
        <template #icon>
          <IconStatistics color="var(--clr-text-dark)" />
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
          <IconActions color="var(--clr-text-dark)" />
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
  @include w(fit-content);
  @include mx(auto);
  @include flex($gap: 30px, $wrap: true);
  justify-content: center;
  align-items: center;
}
</style>
