<script setup lang="ts">
const res = await useFetch("/api/users");
const users = res.data;
</script>

<template>
  <div class="yearbook">
    <Container>
      <InputSearch class="yearbook__search" />

      <div class="yearbook__cards">
        <YearbookCard v-for="user in users" :user="user" />
      </div>
    </Container>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook {
  @include clr-bg(secondary);
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
}
</style>
