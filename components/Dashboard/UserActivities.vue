<script setup lang="ts">
import type { UserActivities } from "~~/@types";

defineProps<{ activities: UserActivities }>();
</script>

<template>
  <div class="activities">
    <div class="section">
      <div class="activity">
        <IconIncomingMessages class="activity__icon" />
        <span class="activity__counter">
          {{ activities.incomingMessagesCount.toString().padStart(2) }}
        </span>
      </div>
      <div class="activity">
        <IconOutgoingMessages class="activity__icon" />
        <span class="activity__counter">
          {{ activities.outgoingMessagesCount.toString().padStart(2) }}
        </span>
      </div>
    </div>

    <div class="section">
      <div class="activity">
        <IconIncomingCloseFriend class="activity__icon" />
        <span class="activity__counter">
          {{ activities.incomingCloseFriendsCount.toString().padStart(2) }}
        </span>
      </div>
      <div class="activity">
        <IconOutgoingCloseFriend class="activity__icon" />
        <span class="activity__counter">
          {{ activities.outgoingCloseFriendsCount.toString().padStart(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.activities {
  @include grid($gap: 20px, $columns: repeat(2, auto));
  @include w(fit-content);
  @include mx(auto);

  .section {
    @include grid($center: true, $gap: 8px, $columns: repeat(2, auto));
  }

  .activity {
    @include clr-bg(secondary);
    @include pa(10px);
    @include size(70px);
    @include br-lg;
    @include grid($rows: 1fr auto, $center: true, $gap: 5px);

    @include lt-mobile {
      @include size(100px);
    }

    &__icon {
      @include size(30px);

      @include lt-mobile {
        @include size(50px);
      }
    }

    &__counter {
      @include fix-numbers;
      @include fs-sm;
      @include fw-bold;

      @include lt-mobile {
        @include fs-base;
      }
    }
  }
}
</style>
