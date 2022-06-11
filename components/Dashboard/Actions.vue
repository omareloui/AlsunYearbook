<script setup lang="ts">
import type { User } from "~~/@types";

const { user } = defineProps<{ user: User }>();

const userHelpers = useUserHelpers(user);

const emit = defineEmits(["toggle-show", "reset"]);
</script>

<template>
  <div class="actions">
    <ButtonBase
      v-if="userHelpers.isInYearbook"
      class="action action--show"
      @click="emit('toggle-show')"
      :title="user.isShown ? 'Hide user' : 'Show user'"
    >
      <transition name="fade" mode="out-in">
        <IconShow v-if="!user.isShown" />
        <IconHide v-else />
      </transition>
    </ButtonBase>

    <transition name="fade">
      <ButtonBase
        v-if="user.username && user.password"
        class="action action--reset"
        @click="emit('reset')"
      >
        <IconReset />
      </ButtonBase>
    </transition>

    <LinkBase
      class="action action--edit"
      :to="`/dashboard/users/${user.socialMedia.fb}/edit`"
    >
      <IconSettings />
    </LinkBase>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.actions {
  @include flex($gap: 40px, $center-v: true);

  .action {
    @include clr-bg(primary);
    @include brdr(none);
    @include size(60px);
    @include pa(10px);
    @include br-lg;
  }
}
</style>
