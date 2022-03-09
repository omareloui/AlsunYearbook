<script setup lang="ts">
import { Action } from "~~/@types";
import DashboardActionCard from "~~/components/Dashboard/ActionCard.vue";

definePageMeta({ middleware: "has-to-be-assistant-to-admin" });

const actions = (await useCustomFetch("/api/actions")) as Action[];
</script>

<template>
  <Container>
    <h1 class="heading">Actions</h1>

    <PreviewWithDayGroups
      :data="actions"
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
