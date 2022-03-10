<template>
  <div class="date-chip"><slot></slot></div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.date-chip {
  @include w(fit-content);
  @include mx(auto);
  @include pa(5px 20px);
  @include clr-bg(primary);
  @include br-bl;
  @include fw-bold;
  @include fs-sm;
  @include fix-numbers;
}
</style>
