<script setup lang="ts">
defineProps<{ title: string; count: number }>();
</script>

<template>
  <section>
    <h2 class="statistics-section__title">{{ title }}</h2>

    <div class="statistics-section__subtitle">
      <p class="statistics-section__count">{{ count }} records</p>
      <slot name="subtitle"></slot>
    </div>

    <slot></slot>
  </section>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.statistics-section {
  &__title,
  &__subtitle {
    @include center-text;
  }

  &__title {
    @include fs-3xl;
  }

  &__subtitle {
    @include fs-sm;
    @include clr-txt(fade);
    @include mb(20px);
  }
}
</style>
