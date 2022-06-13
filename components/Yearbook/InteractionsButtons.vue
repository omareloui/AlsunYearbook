<script setup lang="ts">
import { User } from "~~/@types";
import { useCapitalize } from "~~/composables/useCapitalize";
import { useAuthStore } from "~~/store/useAuth";
import { useYearbookStore } from "~~/store/useYearbook";

const { user } = defineProps<{ user: User }>();

const yearbookStore = useYearbookStore();
const authStore = useAuthStore();
const isMe = authStore.user!._id === user._id;

const emit = defineEmits([
  "make-close-friend",
  "remove-close-friend",
  "open-leave-message",
]);
</script>

<template>
  <div class="interactions-buttons">
    <div v-if="user.role === 'STUDENT' && !isMe">
      <transition name="fade" mode="out-in">
        <ButtonBase
          v-if="!yearbookStore.checkIfCloseFriend(user._id)"
          class="interactions-buttons__button"
          @click="emit('make-close-friend')"
        >
          <IconCloseFriend color="var(--clr-text-dark)" />
          Add close friend
        </ButtonBase>

        <ButtonBase
          v-else
          class="interactions-buttons__button"
          @click="emit('remove-close-friend')"
        >
          <IconRemoveCloseFriend color="var(--clr-text-dark)" />
          Remove close friend
        </ButtonBase>
      </transition>
    </div>

    <ButtonBase
      class="interactions-buttons__button"
      v-if="!isMe"
      @click="emit('open-leave-message')"
    >
      <IconWrite color="var(--clr-text-dark)" />
      Leave a message
    </ButtonBase>

    <LinkBase
      v-if="isMe"
      class="interactions-buttons__button"
      to="/profile/edit"
    >
      <IconSettings color="var(--clr-text-dark)" />
      Edit profile
    </LinkBase>

    <LinkBase
      v-if="authStore.hasAuthority"
      class="interactions-buttons__button"
      :to="`/dashboard/users/${user.socialMedia.fb}`"
    >
      <IconDashboard color="var(--clr-text-dark)" />
      Show in Dashboard
    </LinkBase>

    <LinkBase
      v-if="authStore.hasAuthority"
      class="interactions-buttons__button"
      :to="`/dashboard/users/${user.socialMedia.fb}/edit`"
    >
      <IconSettings color="var(--clr-text-dark)" />
      Edit {{ useCapitalize(user.name.first) }}
    </LinkBase>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.interactions-buttons {
  @include grid($gap: 15px);

  @include w(fit-content);
  @include mx(auto);

  @include lt-mobile {
    @include grid-cols(repeat(2, 1fr));
  }

  @include lt-desktop {
    @include grid-cols(repeat(4, auto));
  }

  &__button {
    @include flex($gap: 10px, $center-v: true);
    @include clr-bg(primary);
    @include clr-txt(dark);
    @include no-underline;
    @include brdr(none);
    @include br-lg;
    @include pa(8px 10px);
    @include fw-bold;
    @include w(100%);

    ::v-deep(svg) {
      @include size(25px);
    }
  }
}
</style>
