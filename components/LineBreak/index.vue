<template><hr /></template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

hr {
  border: none;
  @include size(80% 1px);
  @include br-bl;
  @include clr-bg(text-main);
  @include mx(auto);
  opacity: 0.1;
}
</style>
