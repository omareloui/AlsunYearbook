<script setup lang="ts">
import { User } from "~~/@types";
import { useCapitalize } from "~~/composables/useCapitalize";

defineProps<{ user: User }>();
</script>

<template>
  <div class="interactions-buttons">
    <ButtonBase class="interactions-buttons__button">
      <IconCloseFriend />
      Add close friend
    </ButtonBase>
    <ButtonBase class="interactions-buttons__button">
      <IconWrite />
      Leave a message
    </ButtonBase>

    <LinkBase
      class="interactions-buttons__button"
      :to="`/dashboard/users/${user.socialMedia.fb}`"
    >
      <IconDashboard />
      Show in Dashboard
    </LinkBase>

    <LinkBase
      class="interactions-buttons__button"
      :to="`/dashboard/users/${user.socialMedia.fb}/edit`"
    >
      <IconSettings />
      Edit {{ useCapitalize(user.name.first) }}
    </LinkBase>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.interactions-buttons {
  @include flex($center-v: true, $gap: 15px, $wrap: true);
  @include w(fit-content);
  @include mx(auto);

  &__button {
    @include flex($gap: 10px, $center: true);
    @include clr-bg(primary);
    @include clr-txt;
    @include no-underline;
    @include brdr(none);
    @include br-lg;
    @include pa(8px 10px);
    @include fw-bold;

    ::v-deep(svg) {
      @include size(25px);
    }
  }
}
</style>
