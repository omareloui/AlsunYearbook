<script setup lang="ts">
withDefaults(defineProps<{ to: string; newTab: boolean }>(), { newTab: false });
</script>

<template>
  <a :href="to" :target="newTab ? '_blank' : undefined">
    <slot></slot>
  </a>
</template>
