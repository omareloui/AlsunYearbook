<template>
  <Container>
    <h1 class="heading">Add User</h1>

    <DashboardUserForm />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
}

form {
  --line-margin: 20px;

  @include mt(20px);
  @include mb(40px);

  h2 {
    @include center-text;
    @include fs-4xl;
  }
}
</style>
