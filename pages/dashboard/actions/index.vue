<script setup lang="ts">
import { useDashboardStore } from "~~/store/useDashboard";
import DashboardActionCard from "~~/components/Dashboard/ActionCard.vue";

useHead({ title: "Actions | Dashboard" });
definePageMeta({ middleware: "has-to-be-assistant-to-admin" });

const dashboardStore = useDashboardStore();

await dashboardStore.fetchActions();
</script>

<template>
  <Container>
    <h1 class="heading">Actions</h1>

    <PreviewWithDayGroups
      :data="dashboardStore.actions"
      data-key="action"
      :card-component="DashboardActionCard"
    />

    <YearbookScrollUp />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(20px);
}
</style>
