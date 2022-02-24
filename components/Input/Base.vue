<script setup lang="ts">
withDefaults(defineProps<{ isLarge: boolean }>(), { isLarge: false });
</script>

<template>
  <input :class="{ large: isLarge }" />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

input {
  @include brdr(none);
  @include clr-bg(input-bg);
  @include br-lg;
  @include pa(8px 10px);
  @include block;

  &.large {
    @include fs-lg;
    @include fw-bold;
  }
}
</style>
