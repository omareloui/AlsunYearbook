<script setup lang="ts">
const { to } = withDefaults(defineProps<{ to: string; newTab?: boolean }>(), {
  newTab: false,
});

const emit = defineEmits(["click"]);
const isLocal = computed(() => to.startsWith("/"));
</script>

<template>
  <NuxtLink v-if="isLocal" v-bind="$attrs" :to="to" @click="emit('click')">
    <slot></slot>
  </NuxtLink>

  <a
    v-else="!isLocal"
    v-bind="$attrs"
    :href="to"
    :target="newTab ? '_blank' : undefined"
    @click="emit('click')"
  >
    <slot></slot>
  </a>
</template>
