<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";
import { useUserImage } from "~~/composables/useUserImage";

import type { User } from "~~/@types";

const route = useRoute();
const userId = route.params.userId as string;

// TODO: get the data from the store first if it exists if not fetch it.
const { data } = await useFetch(`/api/yearbook/user?id=${userId}`);
const user = data.value as User;

const yearbookStore = useYearbookStore();
const { next, prev } = await yearbookStore.getPrevAndNext(user);

const scrollTop = useScrollToTop();
onMounted(scrollTop);
</script>

<template>
  <Container class="user">
    <ImageBase
      class="user__image"
      :src="useUserImage(user)"
      :alt="`${user.name.first}'s image.`"
      is-square
      border-radius="lg"
    />

    <h1 class="user__name">{{ user.name.first }} {{ user.name.second }}</h1>

    <div v-if="user.name.nickname" class="user__nickname">
      {{ user.name.nickname }}
    </div>

    <YearbookQuoteBlock :quote="user.quote" />

    <YearbookJobBlock v-if="user.currentJob" :job="user.currentJob" />

    <YearbookSocialMedia class="user__social-media" :sm="user.socialMedia" />

    <LineBreak width="60%" margin="25px" />

    <YearbookInteractionsButtons :user="user" />

    <LineBreak width="60%" margin="25px" />

    <YearbookNavigationButtons
      class="user__nav"
      :next="`/yearbook/${next.socialMedia.fb}`"
      :prev="`/yearbook/${prev.socialMedia.fb}`"
      :home="`/yearbook?section=${yearbookStore.section}`"
      :home-icon="yearbookStore.section"
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

  &__name,
  &__nickname {
    @include center-text;
  }

  &__name,
  &__nickname {
    @include capitalize;
  }

  &__name,
  &__nickname,
  &__nav,
  &__social-media {
    @include mt(25px);
  }

  &__nickname {
    @include fs-3xl;
    @include clr-txt(fade);
  }
}
</style>
