<script setup lang="ts">
import { useUsersStore } from "~~/store/useUsers";

const search = ref("");
const usersStore = useUsersStore();

await usersStore.getUsers();
</script>

<template>
  <Container tag="main" class="users-dashboard">
    <h1 class="users-dashboard__heading">Users</h1>

    <LinkButtonWithIcon
      to="/dashboard/users/add"
      is-large
      class="users-dashboard__add-user-link"
    >
      <template #icon><IconAddUser /></template>
      Add a user
    </LinkButtonWithIcon>

    <LineBreak margin="20px" />

    <InputSearch v-model="search" class="users-dashboard__yearbook__search" />

    <div class="users-dashboard__cards">
      <DashboardUserCard
        v-for="user in usersStore.users"
        :user="user"
        @toggle-show="usersStore.toggleShow"
      />
    </div>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.users-dashboard {
  &__search {
    @include mx(auto);
    @include w(280px);
    @include w(max 100%);
  }

  &__heading {
    @include center-text;
  }

  &__add-user-link {
    @include mt(20px);
    @include mx(auto);
  }

  &__cards {
    @include py(25px);
    @include grid($gap: 20px, $center: true, $columns: 1fr);
  }
}
</style>
