<script setup lang="ts">
import { useYearbookStore } from "~~/store/useYearbook";
import type { YearbookSection } from "~~/@types";

const sections = useYearbookSections();
const yearbookStore = useYearbookStore();

const current = ref(yearbookStore.section);

async function select(section: YearbookSection) {
  await yearbookStore.changeSection(section);
  current.value = section;
}
</script>

<template>
  <div class="section-selection">
    <ButtonBase
      v-for="section of sections"
      is-normalized
      class="section-button"
      :class="{ 'section-button--current': current === section }"
      @click="select(section)"
      >{{ section }}</ButtonBase
    >
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.section-selection {
  @include clr-bg(secondary);
  @include br-bl;
  @include pa(15px);
  @include ma(25px auto);
  @include w(max 580px);

  @include grid($gap: 20px, $center: true, $columns: repeat(2, 1fr));

  @include float(2);

  .section-button {
    @include clr-bg(secondary);
    @include capitalize;
    @include br-bl;
    @include pa(8px 10px);

    @include w(100%);

    @include fs-base;
    @include fw-extrabold;

    @include tran;

    @include remove-android-highlight;

    &--current {
      @include clr-bg(primary);
    }

    @include lt-mobile {
      @include fs-lg;
    }
  }
}
</style>
