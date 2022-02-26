<template>
  <ButtonBase type="submit">
    <slot></slot>
  </ButtonBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

[type="submit"] {
  @include flex($gap: 10px, $center: true);
  justify-content: center;

  @include brdr(none);
  @include clr-bg(primary);

  @include pa(12px);

  @include br-lg;
  @include fw-bold;

  ::v-deep(svg) {
    @include size(25px);
  }
}
</style>
