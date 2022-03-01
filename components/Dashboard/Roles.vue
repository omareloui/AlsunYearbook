<script setup lang="ts">
import { User } from "~~/@types";
import { useUserHasAuthority } from "~~/composables/useUserHasAuthority";
import { useCapitalize } from "~~/composables/useCapitalize";

defineProps<{ user: User }>();
</script>

<template>
  <div class="roles">
    <div class="roles__role roles__role--auth">
      <IconAdmin class="icon" v-if="useUserHasAuthority(user)" />
      <IconUser class="icon" v-else />
      <span class="text">{{ useCapitalize(user.authorityRole) }}</span>
    </div>
    <div class="roles__role roles__role--uni">
      <IconGraduationHat v-if="user.role === 'STUDENT'" class="icon" />
      <IconProfessor v-else-if="user.role === 'PROFESSOR'" class="icon" />
      <IconSpecial v-else-if="user.role === 'SPECIAL_MENTION'" class="icon" />
      <IconVisitor v-else-if="user.role === 'VISITOR'" class="icon" />
      <span class="text">{{ useCapitalize(user.role) }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.roles {
  @include flex($center: true, $gap: 20px, $wrap: true, $center-v: true);
  @include ma(30px auto 40px);
  @include w(fit-content);

  &__role {
    @include flex($gap: 8px);
    align-items: center;

    .icon {
      @include pos-r;
      @include clr-bg(primary);
      @include br-lg;
      @include size(40px);
      @include pa(7px);

      ::v-deep(svg) {
        @include center;
        @include size(100%);
      }
    }

    .text {
      @include fw-semibold;
      @include fs-xl;
    }
  }
}
</style>
