<script setup lang="ts">
withDefaults(defineProps<{ isNormalized?: boolean }>(), {
  isNormalized: false,
});

const emit = defineEmits(["click"]);
</script>

<template>
  <button :class="{ normalized: isNormalized }" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

button {
  @include clickable;

  &.normalized {
    @include brdr(none);
    @include clr-bg(none);
  }
}
</style>
