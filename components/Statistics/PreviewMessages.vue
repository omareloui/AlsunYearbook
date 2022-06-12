<script setup lang="ts">
import { MessagesStatistics } from "types";

defineProps<{ messages: MessagesStatistics }>();
</script>

<template>
  <StatisticsSection title="Messages" :count="messages.totalMessageCount">
    <div class="top-messengers">
      <div
        v-for="topRole in (['topReceivers','topSenders'] as const)"
        class="top-role"
      >
        <div class="top-role__icon">
          <IconIncomingMessages v-if="topRole === 'topReceivers'" />
          <IconOutgoingMessages v-else />
        </div>

        <div class="top-role__users">
          <div class="user" v-for="userInfo in messages[topRole]">
            <p class="user__name">
              {{ useUserFullName(userInfo.user) }}
            </p>
            <p class="user__count">
              {{ userInfo[topRole === "topReceivers" ? "received" : "send"] }}
              messages
            </p>
          </div>
        </div>
      </div>
    </div>
  </StatisticsSection>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.top-messengers {
  display: grid;
  gap: 40px 80px;
  @include w(max 600px);
  @include mx(auto);
  @include my(50px);

  @include lt-mobile {
    grid-template-columns: repeat(2, 1fr);
  }

  .top-role {
    display: grid;
    place-items: center;

    &__icon > :first-child {
      @include h(60px);
      @include mb(30px);
    }

    &__users {
      .user {
        @include center-text;
        @include mb(20px);

        &__name {
          @include fs-lg;
        }

        &__count {
          @include clr-txt(fade);
          @include fs-sm;
        }
      }
    }
  }
}
</style>
