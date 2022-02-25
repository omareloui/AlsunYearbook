<template>
  <Container>
    <h1 class="heading">Users</h1>

    <LinkButtonWithIcon
      to="/dashboard/users/add"
      is-large
      class="add-user-link"
    >
      <template #icon><IconAddUser /></template>
      Add a user
    </LinkButtonWithIcon>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
}

.add-user-link {
  @include mt(20px);
  @include mx(auto);
}
</style>
