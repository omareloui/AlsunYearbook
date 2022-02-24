<script setup lang="ts">
import { User } from "~~/@types";

const isLoading = ref(true);

defineProps<{ user: User }>();

function onLoaded() {
  isLoading.value = false;
}
</script>

<template>
  <div class="yearbook-card">
    <ImageWithOverlay
      class="yearbook-card__image"
      :src="`images/${user.role.toLowerCase()}s/${user.img}.jpg`"
      :alt="`${user.name.first}'s image`"
      :line-one="user.name.first"
      :line-two="user.name.second"
      is-square
      border-radius="lg"
      @loaded="onLoaded"
    />

    <div class="yearbook-card__patches">
      <div class="yearbook-card__patches-left">
        <YearbookPatch
          :is-loading="isLoading"
          v-if="
            user.authorityRole.match(/^ADMIN|ASSISTANT(_TO)_ADMIN|MODERATOR$/)
          "
          class="yearbook-card__patch yearbook-card__patch--admin"
        >
          <IconAdmin color="var(--clr-primary)" />
        </YearbookPatch>
      </div>

      <div class="yearbook-card__patches-right">
        <YearbookPatch
          :is-loading="isLoading"
          class="yearbook-card__patch yearbook-card__patch--message"
        >
          <IconCloseFriend color="var(--clr-primary)" />
        </YearbookPatch>

        <YearbookPatch
          :is-loading="isLoading"
          class="yearbook-card__patch yearbook-card__patch--message"
        >
          <IconInbox has-notifications color="var(--clr-primary)" />
        </YearbookPatch>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook-card {
  @include pos-r;
  @include w(80%);
  @include tran;
  @include br-lg;

  &__patches {
    @include pos-a(top 20px left 0);
    @include w(100%);

    &-right,
    &-left {
      @include pos-a;
      @include flex($gap: 8px, $invert-dir: true);
    }

    @each $inset in right left {
      &-#{$inset} {
        #{$inset}: 20px;
      }
    }
  }

  &:hover {
    transform: scale(1.03);
    @include float(2);

    .yearbook-card__patch {
      opacity: 0;
    }
  }

  @include lt-mobile {
    @include w(100%);
  }
}
</style>
