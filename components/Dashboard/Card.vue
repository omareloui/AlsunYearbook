<script setup lang="ts">
defineProps<{ to: string; title: string }>();
</script>

<template>
  <LinkBase :to="to" class="dashboard-card">
    <slot name="icon"></slot>
    <h2 name="title">{{ title }}</h2>
  </LinkBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.dashboard-card {
  @include grid($center: true);

  @include pa(1.2%);
  @include size(150px);
  @include clr-bg(primary);
  @include clr-txt(dark);
  @include no-underline;
  @include br-lg;
  @include float(2);

  h2 {
    @include fs-lg;
    @include fw-bold;
    @include uppercase;
  }

  ::v-deep(svg) {
    @include size(80%);
  }
}
</style>
