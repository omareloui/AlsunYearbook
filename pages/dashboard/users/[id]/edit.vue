<script setup lang="ts">
import { useUsersStore } from "~~/store/useUsers";

const usersStore = useUsersStore();

const route = useRoute();
const id = route.params.id as string;

const user = await usersStore.fetchUser(id);

const userHelpers = useUserHelpers(user);
</script>

<template>
  <Container class="edit-user">
    <h1 class="edit-user__heading">Edit {{ userHelpers.fullName }}</h1>

    <DashboardUserForm :user-to-edit="user" />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.edit-user {
  &__heading {
    @include mb(25px);
    @include center-text;
  }
}
</style>
