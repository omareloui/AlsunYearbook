<script setup lang="ts">
defineProps<{ title: string; count: number }>();
</script>

<template>
  <section>
    <h2 class="messages__title">{{ title }}</h2>
    <p class="messages__count">{{ count }} records</p>
    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.messages {
  &__title,
  &__count {
    @include center-text;
  }

  &__title {
    @include fs-3xl;
  }

  &__count {
    @include clr-txt(fade);
    @include mb(20px);
  }
}
</style>
