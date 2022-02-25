<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";
import type { User } from "~~/@types";

const yearbookStore = useYearbookStore();
defineProps<{ next: User; prev: User }>();
</script>

<template>
  <div class="yearbook-nav-links">
    <LinkBase
      :to="`/yearbook/${prev.socialMedia.fb}`"
      class="yearbook-nav-links__link yearbook-nav-links__link--prev"
    >
      <IconLeft />
    </LinkBase>

    <LinkBase
      :to="`/yearbook?section=${yearbookStore.section}`"
      class="yearbook-nav-links__link yearbook-nav-links__link--back"
    >
      <IconGraduationHat v-if="yearbookStore.section === 'students'" />
    </LinkBase>

    <LinkBase
      :to="`/yearbook/${next.socialMedia.fb}`"
      class="yearbook-nav-links__link yearbook-nav-links__link--next"
    >
      <IconRight />
    </LinkBase>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook-nav-links {
  @include grid($columns: repeat(3, 1fr), $gap: 20px, $center: true);

  @include w(max 360px);
  @include mx(auto);

  &__link {
    @include grid($center: true);
    @include clr-txt;
    @include pa(10%);
    @include br-cr;
    @include no-underline;
    @include tran;
    @include clr-bg(light-800);

    &--next,
    &--prev {
      @include size(40px);
    }

    &--back {
      @include size(60px);
    }

    &:hover {
      @include clr-bg(primary);
    }
  }
}
</style>
