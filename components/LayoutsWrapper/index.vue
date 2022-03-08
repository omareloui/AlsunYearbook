<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const authStore = useAuthStore();

onServerPrefetch(authStore.setFromCookie);
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
