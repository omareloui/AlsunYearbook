<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";

const yearbookStore = useYearbookStore();

yearbookStore.setSectionOnLoad();
await yearbookStore.getCurrentSectionUsers();

// TODO: add to the route watchEffect()
</script>

<template>
  <div>
    <Container tag="main">
      <MeSection />

      <YearbookSectionsSelection />
    </Container>

    <YearbookBody />
    <YearbookScrollUp />
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;
</style>
