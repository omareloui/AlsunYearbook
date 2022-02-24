<template>
  <div class="logo">
    <Logo />
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.logo {
  margin: auto;
  @include clr-bg(primary);
  @include br-md;
  @include w(60px);
  @include grid($center: true);

  aspect-ratio: 0.85;

  svg {
    @include size(60%);
  }

  @include lt-desktop {
    @include w(80px);
  }
}
</style>
