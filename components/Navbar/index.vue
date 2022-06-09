<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const authStore = useAuthStore();

const isOpen = ref(false);
const isLargerThanTablet = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

function setIsTablet() {
  if (window.innerWidth >= 768) isLargerThanTablet.value = true;
  else isLargerThanTablet.value = false;
}

function signout() {
  authStore.signout();

  toggle();
}

onMounted(() => {
  setIsTablet();
  addEventListener("resize", setIsTablet);
});

onUnmounted(() => removeEventListener("resize", setIsTablet));
</script>

<template>
  <Container class="navbar">
    <div class="head">
      <LinkBase :to="isLargerThanTablet ? '/' : '/yearbook'" class="logo-link">
        <Logo class="logo" />
      </LinkBase>

      <NavbarBurgerButton
        :is-open="isOpen"
        class="burger-button"
        @toggle="toggle"
      />
    </div>

    <Transition name="nav">
      <nav class="body" v-if="isOpen || isLargerThanTablet">
        <ul>
          <div class="links-block links-block--nav">
            <li>
              <LinkBase to="/yearbook" @click="toggle">Yearbook</LinkBase>
            </li>
            <li>
              <LinkBase to="/profile/edit" @click="toggle"
                >Edit profile</LinkBase
              >
            </li>
            <li v-if="authStore.hasAuthority">
              <LinkBase to="/dashboard" @click="toggle">Dashboard</LinkBase>
            </li>
          </div>

          <LineBreak v-if="!isLargerThanTablet" />

          <div class="links-block links-block--auth">
            <li>
              <ButtonBase @click="signout" is-normalized>Logout</ButtonBase>
            </li>
          </div>
        </ul>
      </nav>
    </Transition>
  </Container>

  <transition name="fade">
    <div
      class="nav-overlay"
      v-if="isOpen && !isLargerThanTablet"
      @click="toggle"
    ></div>
  </transition>
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
    @include br-lg;
    @include pa(10px 15px);
    @include flex($center-v: true);

    @include clr-bg(primary, 0.5);
    backdrop-filter: blur(8px);

    .logo-link {
      @include h(30px);
      @include flex;
    }

    .burger-button {
      @include center-v;
      right: 20px;
    }

    @include lt-tablet {
      justify-content: flex-start;
      @include px(35px);

      .burger-button {
        @include remove;
      }
    }
  }

  .body {
    @include pos-a;
    @include w(calc(100% - 20px));
    @include br-lg;
    @include mt(15px);
    @include pa(20px);

    @include clr-bg(primary, 0.5);
    backdrop-filter: blur(8px);

    ul {
      list-style: none;
      text-align: center;

      @include grid($gap: 5px);

      li {
        @include pa(5px);

        ::v-deep(a),
        ::v-deep(button) {
          @include clr-txt;
          @include fw-black;
          @include fs-lg;
          @include no-underline;
        }
      }
    }

    @include lt-tablet {
      @include center-v;
      right: 35px;

      @include w(fit-content);
      @include mt(0);
      @include pa(0);

      @include clr-bg(none);
      backdrop-filter: unset;

      ul {
        display: flex;

        .links-block {
          display: flex;
          gap: 10px;

          &:last-child {
            @include ml(25px);
          }

          li {
            ::v-deep(a),
            ::v-deep(button) {
              @include fs-sm;
              @include fw-extrabold;
            }
          }
        }
      }
    }
  }
}

.nav-overlay {
  z-index: 999;
  @include clr-bg(primary, 0.2);
  @include size(100% 100vh);
  @include pos-f(top 0 left 0);

  backdrop-filter: blur(8px);
}
</style>
