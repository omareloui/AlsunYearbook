<script setup lang="ts">
withDefaults(
  defineProps<{ to: string; isCta?: boolean; isLarge?: boolean }>(),
  {
    isCta: false,
    isLarge: false,
  }
);
</script>

<template>
  <LinkBase
    :to="to"
    class="link-button"
    :class="{
      'link-button--cta': isCta,
      'link-button--large': isLarge,
    }"
  >
    <slot></slot>
  </LinkBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.link-button {
  text-decoration: none;
  @include inline-block;
  @include fw-bold;
  @include clr-txt;
  @include pa(10px);
  @include br-md;

  &--cta {
    @include clr-bg(primary);
  }

  &--large {
    @include fs-lg;
    @include pa(15px 20px);
    @include br-lg;
  }
}
</style>
