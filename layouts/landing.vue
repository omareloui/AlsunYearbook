<template>
  <Container tag="main">
    <LogoLandingPage class="logo" />
    <slot></slot>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

main {
  @include pt(20px);
  @include pb(30px);

  .logo {
    @include mb(20px);
  }

  @include lt-desktop {
    @include py(40px);
  }
}
</style>
