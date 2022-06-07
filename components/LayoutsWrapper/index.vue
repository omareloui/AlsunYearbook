<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const authStore = useAuthStore();

authStore.setFromCookie();
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
