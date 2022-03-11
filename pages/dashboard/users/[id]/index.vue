<script setup lang="ts">
import { useUsersStore } from "~~/store/useUsers";
import type { UserActivities } from "~~/@types";

const usersStore = useUsersStore();

const route = useRoute();
const id = route.params.id as string;

const user = await usersStore.fetchUser(id);

const userHelpers = useUserHelpers(user, {
  includeThirdName: true,
  imageRes: "original",
});

useMeta({ title: `${userHelpers.fullName} | Dashboard` });

const { next, prev } = await usersStore.getPrevAndNext(user);

async function toggleShow() {
  await usersStore.toggleShow(user.socialMedia.fb);
  user.isShown = !user.isShown;
}

async function reset() {
  await usersStore.resetUser(user.socialMedia.fb);
  user.username = null;
  user.password = null;
}

const activities = (await useCustomFetch(
  `/api/users/activities?id=${user._id.toString()}`
)) as UserActivities;

const scrollTop = useScrollToTop();
onMounted(scrollTop);
</script>

<template>
  <Container class="user">
    <ImageBase
      v-if="userHelpers.isInYearbook"
      class="user__image"
      :src="userHelpers.image"
      :alt="`${user.name.first}'s image.`"
      is-square
      border-radius="lg"
    />
    <h1 class="user__name">{{ userHelpers.fullName }}</h1>

    <div class="user__username-gender">
      <div class="gender">
        <IconFemale
          v-if="user.gender === 'FEMALE'"
          color="var(--clr-text-fade)"
        />
        <IconMale v-if="user.gender === 'MALE'" color="var(--clr-text-fade)" />
      </div>
      <div v-if="user.username" class="username">{{ user.username }}</div>
    </div>

    <div class="user__id">{{ user._id }}</div>

    <DashboardSocialMedia :user="user" />

    <DashboardRoles :user="user" />

    <YearbookQuoteBlock v-if="user.quote" :quote="user.quote" />

    <YearbookJobBlock v-if="user.currentJob" :job="user.currentJob" />

    <LineBreak width="60%" margin="25px" />

    <DashboardUserActivities :activities="activities" />

    <LineBreak width="60%" margin="25px" />

    <DashboardActions :user="user" @toggle-show="toggleShow" @reset="reset" />

    <LineBreak width="60%" margin="25px" />

    <YearbookNavigationButtons
      :next="`/dashboard/users/${next.socialMedia.fb}`"
      :prev="`/dashboard/users/${prev.socialMedia.fb}`"
      home="/dashboard/users"
      home-icon="users"
    />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.user {
  @include pb(40px);

  &__image {
    @include float(2);
    @include mx(auto);
    @include w(70%);
    @include w(max 350px);
  }

  &__name {
    @include mt(25px);
    @include center-text;
  }

  &__username-gender {
    @include flex($center-v: true, $gap: 5px);
    align-items: center;

    @include mt(10px);
    @include mb(12px);

    @include clr-txt(fade);

    .gender {
      @include pos-r;
      @include size(18px);

      ::v-deep(svg) {
        @include center;
        @include size(100%);
      }
    }
    .username {
      @include fs-lg;
    }
  }

  &__id {
    @include clr-txt(fade);
    @include center-text;
    @include fs-xs;
  }
}
</style>
