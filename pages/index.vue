<script setup lang="ts">
import { useThemeStore } from "~~/store/useTheme";
const themeStore = useThemeStore();
</script>

<template>
  <div>
    <button @click="themeStore.toggleTheme">Toggle Theme</button>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

div {
  @include h(100vh);
  @include grid($center: true);

  button {
    border: none;

    @include ff(main);

    @include clickable;
    @include br-lg;
    @include clr-bg(invert);
    @include clr-txt(invert);
    @include pa(20px);
  }
}
</style>
