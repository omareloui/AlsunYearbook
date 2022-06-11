<script setup lang="ts">
type HomeIcon = "students" | "professors" | "users";
const { next, prev, homeIcon, home } = defineProps<{
  next: string;
  prev: string;
  homeIcon: HomeIcon;
  home: string;
}>();
</script>

<template>
  <div class="yearbook-nav-links">
    <LinkBase
      :to="prev"
      class="yearbook-nav-links__link yearbook-nav-links__link--prev"
    >
      <IconLeft />
    </LinkBase>

    <LinkBase
      :to="home"
      class="yearbook-nav-links__link yearbook-nav-links__link--back"
    >
      <IconGraduationHat v-if="homeIcon === 'students'" />
      <IconProfessor v-else-if="homeIcon === 'professors'" />
      <IconUsers v-else-if="homeIcon === 'users'" />
    </LinkBase>

    <LinkBase
      :to="next"
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
    @include remove-android-highlight;

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
