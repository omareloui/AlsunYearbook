<script setup lang="ts">
import { debounce } from "lodash";

import { useYearbookStore } from "~~/store/useYearbook";
const yearbookStore = useYearbookStore();

const debouncedSearch = debounce(yearbookStore.search, 300);
</script>

<template>
  <div class="yearbook">
    <Container>
      <InputSearch
        @input="debouncedSearch"
        v-model="yearbookStore.searchQuery"
        class="yearbook__search"
      />

      <div v-if="yearbookStore.shown.length" class="yearbook__cards">
        <YearbookCard v-for="user in yearbookStore.shown" :user="user" />
      </div>
      <div v-else class="yearbook__no-result">
        <span> Can't find {{ yearbookStore.searchQuery }}.</span>
      </div>
    </Container>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook {
  @include clr-bg(secondary);
  @include h(min calc(100vh - 300px));
  @include float(2);
  @include py(40px);

  &__search {
    @include mx(auto);
    @include w(280px);
    @include w(max 100%);
  }

  &__cards {
    @include py(25px);
    @include grid($gap: 20px, $center: true, $columns: 1fr);

    @include lt-mobile {
      @include grid-cols(repeat(2, 1fr));
    }

    @include lt-tablet {
      @include grid-cols(repeat(3, 1fr));
    }
  }

  &__no-result {
    @include grid($center: true);
    @include mt(30px);

    > span {
      @include fw-semibold;
      @include fs-3xl;
    }
  }
}
</style>
