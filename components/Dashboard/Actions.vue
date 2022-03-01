<script setup lang="ts">
import { useUsersStore } from "~~/store/useUsers";
import type { User } from "~~/@types";

const usersStore = useUsersStore();
const { user } = defineProps<{ user: User }>();

const emit = defineEmits(["toggle-show"]);
</script>

<template>
  <div class="actions">
    <ButtonBase class="action action--show" @click="emit('toggle-show')">
      <transition name="fade" mode="out-in">
        <IconShow v-if="!user.isShown" />
        <IconHide v-else />
      </transition>
    </ButtonBase>

    <ButtonBase class="action action--reset">
      <IconReset />
    </ButtonBase>

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
