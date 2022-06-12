<script setup lang="ts">
import { CloseFriendsStatistics } from "types";

defineProps<{ closeFriends: CloseFriendsStatistics }>();
</script>

<template>
  <StatisticsSection
    title="Close Friends"
    :count="closeFriends.totalRecordsCount"
  >
    <div class="top-close-friends">
      <div
        v-for="topRole in (['topIsCloseFriends','topHasCloseFriends'] as const)"
        class="top-role"
      >
        <div class="top-role__icon">
          <IconIncomingCloseFriend v-if="topRole === 'topIsCloseFriends'" />
          <IconOutgoingCloseFriend v-else />
        </div>

        <div class="top-role__users">
          <div class="user" v-for="userInfo in closeFriends[topRole]">
            <p class="user__name">
              {{ useUserFullName(userInfo.user) }}
            </p>
            <p class="user__count">
              {{
                userInfo[
                  topRole === "topIsCloseFriends"
                    ? "isCloseFriend"
                    : "hasCloseFriend"
                ]
              }}
              friends
            </p>
          </div>
        </div>
      </div>
    </div>
  </StatisticsSection>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.top-close-friends {
  display: grid;
  gap: 40px 10px;
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
      @include mb(20px);
    }

    &__users {
      .user {
        @include center-text;
        @include mb(10px);

        &__name {
          @include fs-lg;
        }

        &__count {
          @include clr-txt(fade);
          @include fs-base;
        }
      }
    }
  }
}
</style>
