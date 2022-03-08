<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const setUser = () => useAuthStore().setFromCookie();

onBeforeMount(setUser);
</script>

<template>
  <LayoutsWrapper>
    <Container tag="main">
      <LinkBase to="/">
        <LogoLandingPage class="logo" />
      </LinkBase>
      <slot></slot>
      <Notify />
    </Container>
  </LayoutsWrapper>
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
