<script setup lang="ts">
import { useMockData } from "~~/composables/useMockData";
import { UserRole } from "~~/@types";

const mockData = useMockData();

const { currentIndex } =
  defineProps<{ currentIndex: number; role: UserRole }>();

const next =
  currentIndex === mockData.length - 1
    ? mockData[0]
    : mockData[currentIndex + 1];

const prev =
  currentIndex === 0
    ? mockData[mockData.length - 1]
    : mockData[currentIndex - 1];
</script>

<template>
  <div class="yearbook-nav-links">
    <LinkBase
      :to="`/yearbook/${prev.username}`"
      class="yearbook-nav-links__link yearbook-nav-links__link--prev"
    >
      <IconLeft />
    </LinkBase>

    <LinkBase
      :to="`/yearbook?section=${role.toLowerCase()}`"
      class="yearbook-nav-links__link yearbook-nav-links__link--back"
    >
      <IconGraduationHat v-if="role === 'STUDENT'" />
    </LinkBase>

    <LinkBase
      :to="`/yearbook/${next.username}`"
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
