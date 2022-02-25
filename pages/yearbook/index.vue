<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";

const yearbookStore = useYearbookStore();

yearbookStore.setSectionOnLoad();
await yearbookStore.getCurrentSectionUsers();

// TODO: add to the route watchEffect()
</script>

<template>
  <div>
    <Container>
      <MeSection />

      <YearbookSectionsSelection />
    </Container>

    <YearbookBody />
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;
</style>
