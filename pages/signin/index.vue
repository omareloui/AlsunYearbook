<script setup lang="ts">
definePageMeta({ layout: "landing" });
</script>

<template>
  <Container tag="main" class="sign">
    <h1>Signin</h1>
    <AuthSignForm type="in" />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

h1 {
  @include center-text;
  @include mb(20px);
}
</style>
