<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";

const yearbookStore = useYearbookStore();

await yearbookStore.getCurrentSection();
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
