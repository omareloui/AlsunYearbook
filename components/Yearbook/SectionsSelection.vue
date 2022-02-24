<script setup lang="ts">
type Section = "students" | "professors";

const sections = ["students", "professors"] as Section[];

const current = ref("students" as Section);

function select(section: Section) {
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

    &--current {
      @include clr-bg(primary);
    }

    @include lt-mobile {
      @include fs-lg;
    }
  }
}
</style>
