<script setup lang="ts">
definePageMeta({ layout: "landing" });
</script>

<template>
  <Container tag="main" class="sign">
    <h1>Signup</h1>
    <AuthSignForm type="up" />

    <p class="description">
      You have to be part of this yearbook to be able to browse it. If yo're one
      of Alsun's Spanish department, class 2017/2021 and you can't reach the
      yearbook feel free to email
      <LinkBase to="mailto:alsun.yearbook@gmail.com"
        >alsun.yearbook@gmail.com</LinkBase
      >.
    </p>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

h1,
.description {
  @include center-text;
}

h1 {
  @include mb(20px);
}

.description {
  @include mt(40px);
}
</style>
