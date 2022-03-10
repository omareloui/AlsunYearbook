<script setup lang="ts">
import { User } from "~~/@types";
import { useUserImage } from "~~/composables/useUserImage";
import { useYearbookStore } from "~~/store/useYearbook";
import { useMessagesStore } from "~~/store/useMessages";

const yearbookStore = useYearbookStore();
const messagesStore = useMessagesStore();

const isLoading = ref(true);

const { user } = defineProps<{ user: User }>();

const userHelpers = useUserHelpers(user);
const hasMessage = !!messagesStore.unread.find(
  m => m.author?._id.toString() === user._id.toString()
);

function onLoaded() {
  isLoading.value = false;
}
</script>

<template>
  <LinkBase class="yearbook-card" :to="`/yearbook/${user.socialMedia.fb}`">
    <ImageWithOverlay
      class="yearbook-card__image"
      :src="useUserImage(user)"
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
          v-if="userHelpers.hasAuthority"
          :is-loading="isLoading"
          class="yearbook-card__patch yearbook-card__patch--admin"
        >
          <IconAdmin color="var(--clr-primary)" />
        </YearbookPatch>
      </div>

      <div class="yearbook-card__patches-right">
        <YearbookPatch
          v-if="yearbookStore.checkIfCloseFriend(user._id)"
          :is-loading="isLoading"
          class="yearbook-card__patch yearbook-card__patch--message"
        >
          <IconCloseFriend color="var(--clr-primary)" />
        </YearbookPatch>

        <YearbookPatch
          v-if="hasMessage"
          :is-loading="isLoading"
          class="yearbook-card__patch yearbook-card__patch--message"
        >
          <IconInbox has-notifications color="var(--clr-primary)" />
        </YearbookPatch>
      </div>
    </div>
  </LinkBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook-card {
  @include pos-r;
  @include w(80%);
  @include tran;
  @include br-lg;
  @include clr-txt;

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
