<script setup lang="ts">
definePageMeta({ layout: "landing" });

useHead({ title: "Signup" });
</script>

<template>
  <Container tag="main" class="sign">
    <h1>Signup</h1>
    <AuthSignForm type="up" />

    <article class="description">
      <p>
        You should be part of the yearbook to be able to browse it. If yo're one
        of Alsun's Spanish department, class 2017/2021 and you can't reach the
        yearbook feel free to contact
        <LinkBase to="https://t.me/omareloui">Omar Eloui</LinkBase>.
      </p>
      <p>
        If you're interested in having a visitor account you can contact him
        too.
      </p>
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
