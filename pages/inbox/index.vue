<template>
  <Container>
    <h1 class="heading">Inbox</h1>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(30px);
}
</style>
