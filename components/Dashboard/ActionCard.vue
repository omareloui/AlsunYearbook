<script setup lang="ts">
import type { Action } from "~~/@types";
import moment from "moment";
import { useUserFullName } from "~~/composables/useUserFullName";

defineProps<{ action: Action }>();
</script>

<template>
  <div class="action" :class="{ 'action--has-affected': !!action.affected }">
    <div v-if="action.affected" class="action__affected">
      <LinkBase :to="`/dashboard/users/${action.affected.socialMedia.fb}`">
        {{ useUserFullName(action.affected) }}
      </LinkBase>
    </div>

    <div class="action__body">
      {{ action.action }}
    </div>

    <div class="action__signature">
      <LinkBase :to="`/dashboard/users/${action.signature.socialMedia.fb}`">
        {{ useUserFullName(action.signature) }}
      </LinkBase>
    </div>
    <div class="action__time">
      {{ moment(action.createdAt).format("h:mm a") }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.action {
  @include clr-bg(secondary);
  @include pa(15px 20px);
  @include br-lg;

  @include grid($gap: 3px);

  grid-template-areas: "body body" "signature time";

  &--has-affected {
    grid-template-areas: "affected affected" "body body" "signature time";
  }

  &__signature ::v-deep(a),
  &__time {
    @include clr-txt(fade, 0.8);
  }

  &__body {
    grid-area: body;
    @include mb(10px);
  }

  &__affected {
    grid-area: affected;

    ::v-deep(a) {
      @include clr-txt;
      @include no-underline;
      @include fs-2xl;
      @include fw-bold;
    }
  }

  &__signature {
    grid-area: signature;
    ::v-deep(a) {
      @include no-underline;
    }
  }
  &__time {
    grid-area: time;
    justify-self: end;
  }
}
</style>
