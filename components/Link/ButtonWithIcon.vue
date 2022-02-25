<script setup lang="ts">
withDefaults(defineProps<{ to: string; isLarge?: boolean }>(), {
  isLarge: false,
});
</script>

<template>
  <LinkButton
    :to="to"
    class="link-with-icon"
    :class="{ 'link-with-icon--large': isLarge }"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </LinkButton>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.link-with-icon {
  @include flex($gap: 10px, $center: true);
  @include clr-bg(primary);
  @include brdr(none);
  @include br-lg;
  @include pa(8px 10px);
  @include fw-bold;
  @include w(fit-content);

  ::v-deep(svg) {
    @include size(25px);
  }

  &--large {
    @include fs-xl;
    @include pa(10px 15px);

    ::v-deep(svg) {
      @include size(35px);
    }
  }
}
</style>
