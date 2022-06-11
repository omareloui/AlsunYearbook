<script setup lang="ts">
withDefaults(defineProps<{ tag?: string; hasScrollButton?: boolean }>(), {
  tag: "div",
  hasScrollButton: false,
});
</script>

<template>
  <component
    :is="tag"
    class="container"
    :class="{ 'container--has-scroll-button': hasScrollButton }"
  >
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.container {
  --container-width: var(--screen-desktop);
  --container-padding: 10px;

  max-width: var(--container-width);
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: calc(var(--container-padding) * 2 + var(--container-width))) {
    max-width: 100%;
  }

  &--has-scroll-button {
    @include pb(55px);
  }
}
</style>
