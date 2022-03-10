<script setup lang="ts">
import type { Action } from "~~/@types";
import { useUserFullName } from "~~/composables/useUserFullName";

const formattedDate = ref("");

const { action } = defineProps<{ action: Action }>();

onBeforeMount(async () => {
  const { default: moment } = await import("moment");
  formattedDate.value = moment(action.createdAt).format("h:mm a");
});
</script>

<template>
  <div
    class="action"
    :class="{
      'action--has-affected': !!action.affected && !!action.affected.user,
    }"
  >
    <div
      v-if="action.affected && action.affected.user"
      class="action__affected"
    >
      <LinkBase :to="`/dashboard/users/${action.affected.user.socialMedia.fb}`">
        {{ useUserFullName(action.affected.user) }}
      </LinkBase>
    </div>

    <div class="action__body">
      {{ action.action }}
      <ul
        class="affected-fields"
        v-if="action.affected && action.affected.fields"
      >
        <li v-for="affectedField in action.affected.fields">
          Changed field "{{ affectedField.field }}" from "{{
            affectedField.from
          }}" to "{{ affectedField.to }}".
        </li>
      </ul>
    </div>

    <div class="action__signature">
      <LinkBase :to="`/dashboard/users/${action.signature.socialMedia.fb}`">
        {{ useUserFullName(action.signature) }}
      </LinkBase>
    </div>

    <div class="action__time">
      {{ formattedDate }}
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
    @include break-word;
    @include mb(10px);

    ul {
      @include mt(5px);
      @include ml(30px);
    }
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
    @include fix-numbers;
  }
}
</style>
