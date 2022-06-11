<script setup lang="ts">
definePageMeta({ layout: "landing" });

useHead({ title: "Signup" });
</script>

<template>
  <Container tag="main" class="sign">
    <h1>Signin</h1>
    <AuthSignForm type="in" />

    <article class="description">
      If you forgot your password you can contact
      <LinkBase to="https://t.me/omareloui">Omar Eloui</LinkBase>.
    </article>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

h1,
.description {
  @include center-text;
}

h1 {
  @include mb(30px);
}

.description {
  @include mt(40px);
}
</style>
