<script setup lang="ts">
const { isLoading } = defineProps<{ isLoading: boolean }>();
</script>

<template>
  <div class="yearbook-patch" :class="{ 'yearbook-patch--loading': isLoading }">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook-patch {
  @include clr-bg(text-main);
  @include br-cr;
  @include size(35px);
  @include pa(20%);
  @include grid($center: true);
  @include tran(opacity);

  &::v-deep(svg) {
    @include tran(opacity);
    @include size(100%);
  }

  &--loading {
    animation: skeleton-loading 1s linear infinite alternate;

    &::v-deep(svg) {
      opacity: 0;
    }
  }
}
</style>
