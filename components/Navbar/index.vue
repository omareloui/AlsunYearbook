<script setup lang="ts">
const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <Container class="navbar">
    <div class="head">
      <LinkBase to="/" class="logo-link">
        <Logo class="logo" />
      </LinkBase>

      <NavbarBurgerButton
        :is-open="isOpen"
        class="burger-button"
        @toggle="toggle"
      />
    </div>

    <Transition name="nav">
      <nav class="body" v-if="isOpen">
        <ul>
          <li>Edit profile</li>
          <li>Dashboard</li>
          <LineBreak />
          <li>Logout</li>
        </ul>
      </nav>
    </Transition>
  </Container>

  <Transition name="fade">
    <div class="nav-overlay" v-if="isOpen"></div>
  </Transition>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.navbar {
  z-index: 1000;
  @include pos-s(top 0);
  @include w(100%);
  @include py(20px);

  .head {
    @include pos-r;
    @include clr-bg(primary);
    @include br-lg;
    @include pa(10px 15px);
    @include flex($center-v: true);

    .logo-link {
      @include h(30px);
      @include flex;
    }

    .burger-button {
      @include center-v;
      right: 20px;
    }
  }

  .body {
    @include pos-a;
    @include w(calc(100% - 20px));
    @include clr-bg(primary);
    @include br-lg;
    @include mt(15px);
    @include pa(20px);

    ul {
      list-style: none;
      text-align: center;

      @include grid($gap: 15px);

      li {
        @include br-md;
        @include pa(5px);
        @include fw-black;
        @include fs-lg;
      }
    }
  }
}

.nav-overlay {
  z-index: 999;
  @include clr-bg(primary, 0.2);
  @include size(100% 100vh);
  @include pos-f(top 0 left 0);

  backdrop-filter: blur(10px);
}
</style>
