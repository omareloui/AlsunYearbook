<script setup lang="ts">
import { useThemeStore } from "~~/store/useTheme";

const themeStore = useThemeStore();
themeStore.load();

onMounted(themeStore.loadMediaQuery);
</script>

<template>
  <div>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
