<script setup lang="ts">
const route = useRoute();
const username = route.params.username as string;

const { data: user } = await useFetch(
  `/api/yearbook/user?username=${username}`
);
</script>

<template>
  <Container class="user">
    <ImageBase
      class="user__image"
      :src="`/images/${user.role.toLowerCase()}s/${user.img}.jpg`"
      :alt="`${user.name.first}'s image.`"
      is-square
      border-radius="lg"
    />

    <h1 class="user__name">{{ user.name.first }} {{ user.name.second }}</h1>

    <div v-if="user.name.nickname" class="user__nickname">
      {{ user.name.nickname }}
    </div>

    <YearbookQuoteBlock :quote="user.quote" />

    <div v-if="user.currentJob" class="user__job">{{ user.currentJob }}</div>

    <YearbookSocialMedia class="user__social-media" :sm="user.socialMedia" />

    <LineBreak width="60%" margin="25px" />

    <YearbookInteractionsButtons />

    <LineBreak width="60%" margin="25px" />

    <!-- <YearbookNavigationButtons class="user__nav" /> -->
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
  &__nickname,
  &__job {
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

  &__name {
    @include fs-6xl;
    line-height: 100%;
  }

  &__nickname {
    @include fs-3xl;
    @include clr-txt(fade);
  }

  &__job {
    word-break: break-word;
    @include mx(auto);
    @include mt(40px);

    @include w(100%);
    @include w(max 800px);

    @include lt-tablet {
      @include w(80%);
    }
  }
}
</style>
