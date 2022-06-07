<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const authStore = useAuthStore();

onBeforeMount(async () => {
  await nextTick();
  await authStore.setFromCookie();
});
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
