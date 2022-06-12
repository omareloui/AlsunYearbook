<script setup lang="ts">
import type { Statistics } from "types";

const { users, messages, closeFriends } = (await useTokenedFetch(
  "/api/statistics"
)) as Statistics;
</script>

<template>
  <Container tag="main">
    <h1 class="heading">Statistics</h1>

    <StatisticsPreviewUsers v-bind="{ users }" />
    <LineBreak margin="50px" />
    <StatisticsPreviewCloseFriends v-bind="{ closeFriends }" />
    <LineBreak margin="50px" />
    <StatisticsPreviewMessages v-bind="{ messages }" />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(20px);
}
</style>
