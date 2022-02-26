<script setup lang="ts">
import { useNotificationStore } from "~~/store/useNotification";

const notificationStore = useNotificationStore();
</script>

<template>
  <div>
    <div class="notifications">
      <div
        v-for="notification in notificationStore.notifications"
        :class="`notification notification--${notification.type} ${
          notification.isShown ? 'notification--shown' : ''
        }`"
        :key="notification.id"
      >
        <transition name="fade">
          <div v-if="notification.isShown" class="notification__content">
            {{ notification.message }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

$offset: 10px;

.notifications {
  z-index: 999;
  @include grid($gap: 5px);
  @include pos-f(bottom $offset right $offset);
  @include w(100%);
  @include not-clickable;

  .notification {
    @include grid($center-v: true);
    justify-self: right;
    width: calc(100% - #{$offset} * 2);
    @include center-text;
    @include fs-lg;

    @include lt-tablet {
      @include w(auto);
      max-width: calc(var(--screen-tablet) - #{$offset * 2});
      text-align: left;
    }

    &__content {
      @include br-lg;
      @include pa(10px 20px);
      @include clr-txt(light);
    }

    // Set notifications colors
    @each $type in success error warn info {
      &--#{$type} .notification__content {
        @include clr-bg($type);
      }
    }
  }
}
</style>
