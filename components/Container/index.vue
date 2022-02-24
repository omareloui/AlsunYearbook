<script setup lang="ts">
withDefaults(defineProps<{ tag?: string }>(), {
  tag: "div",
});
</script>

<template>
  <component :is="tag" class="container">
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
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
}
</style>
