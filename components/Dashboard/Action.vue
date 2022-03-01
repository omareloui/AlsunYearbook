<script setup lang="ts">
import { User } from "~~/@types";
// import { useUserHasAuthority } from "~~/composables/useUserHasAuthority";
// import { useCapitalize } from "~~/composables/useCapitalize";

defineProps<{ user: User }>();
</script>

<template>
  <div class="actions">
    <ButtonBase class="action action--show">
      <transition name="fade" mode="in-out">
        <IconShow v-if="user.isShown" />
        <IconShow v-else />
      </transition>
    </ButtonBase>

    <ButtonBase class="action action--reset">
      <IconReset />
    </ButtonBase>

    <LinkBase class="action action--edit" to="#">
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
