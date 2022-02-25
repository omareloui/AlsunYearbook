<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";
import type { User } from "~~/@types";

const yearbookStore = useYearbookStore();
const { currentUser } = defineProps<{ currentUser: User }>();

const { next, prev } = await yearbookStore.getPrevAndNext(currentUser);
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
      <IconProfessor v-if="yearbookStore.section === 'professors'" />
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
    @include br-cr;
    @include no-underline;
    @include tran;
    @include clr-bg(light-800);

    &--next,
    &--prev {
      @include size(40px);
      @include pa(10%);
    }

    &--back {
      @include size(60px);
      @include pa(15%);
    }

    &:hover {
      @include clr-bg(primary);
    }

    ::v-deep(svg) {
      @include size(100%);
    }
  }
}
</style>
