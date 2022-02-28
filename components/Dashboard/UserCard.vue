<script setup lang="ts">
import type { User } from "~~/@types";
import { useUserHelpers } from "~~/composables/useUserHelpers";
import { useCapitalize } from "~~/composables/useCapitalize";

const { user } = defineProps<{ user: User }>();

const userHelpers = useUserHelpers(user);
</script>

<template>
  <LinkBase class="card" :to="`/dashboard/users/${user.socialMedia.fb}`">
    <ImageBase
      class="card__image"
      :src="userHelpers.image"
      :alt="`${user.name.first}'s image`"
      is-square
      border-radius="lg"
    />
    <div class="card__info">
      <div class="full-name">
        {{ userHelpers.fullName }}
      </div>

      <div
        class="username"
        :class="{ 'username--not-registered': !user.username }"
      >
        {{ userHelpers.username }}
      </div>

      <div class="role">
        {{ useCapitalize(user.role) }}
      </div>
    </div>

    <div class="card__actions">
      <ButtonBase class="action action--show">
        <transition name="fade" mode="in-out">
          <IconShow v-if="user.isShown" />
          <IconShow v-else />
        </transition>
      </ButtonBase>
      <ButtonBase class="action action--reset">
        <IconReset />
      </ButtonBase>
    </div>
  </LinkBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.card {
  @include clr-bg(secondary);
  @include br-lg;
  @include pa(10px);
  @include w(100%);
  @include grid($columns: 70px 1fr auto, $gap: 10px);
  @include clr-txt;
  @include no-underline;
  @include tran;

  &:hover {
    @include float(3);
  }

  &__info {
    overflow: hidden;

    > :not(:first-child) {
      @include mb(5px);
    }

    .full-name {
      @include fw-bold;
      @include fs-2xl;
    }
    .username {
      @include fw-semibold;

      &--not-registered {
        @include clr-txt(error);
      }
    }

    .role {
      @include fs-sm;
      @include clr-txt(fade);
    }
  }

  &__actions {
    @include h(max 80px);
    @include grid($rows: repeat(2, 1fr), $gap: 8px, $center: true);

    .action {
      @include clr-bg(primary);
      @include brdr(none);
      @include size(35px);
      @include pa(5px);
      @include br-md;
    }
  }
}
</style>
