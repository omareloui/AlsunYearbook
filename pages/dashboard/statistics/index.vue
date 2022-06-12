<script setup lang="ts">
import { useStatisticsStore } from "~~/store/useStatistics";

const statisticsStore = useStatisticsStore();

const { data } = await useAsyncData("statistics", async () => {
  await statisticsStore.fetchStatistics();
  return statisticsStore.statistics!;
});
const { users, closeFriends, messages } = data.value;
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
