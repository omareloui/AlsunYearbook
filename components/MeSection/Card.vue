<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.card {
  @include clr-bg(primary);
  @include pa(25%);
  @include br-xl;
  @include grid($center: true);
  @include float(2);

  aspect-ratio: 1;

  ::v-deep(svg) {
    @include size(100%);
  }
}
</style>
