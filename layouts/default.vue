<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const setUser = () => useAuthStore().setFromCookie();

onBeforeMount(setUser);
</script>

<template>
  <div>
    <Navbar />
    <slot></slot>
    <Notify />
  </div>
</template>
