<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";

const authStore = useAuthStore();
</script>

<template>
  <section class="me">
    <MeSectionCard :to="`/yearbook/${authStore.user.socialMedia.fb}`">
      <IconProfile />
    </MeSectionCard>

    <MeSectionCard to="#">
      <IconInbox has-notifications />
    </MeSectionCard>
  </section>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.me {
  @include grid($center: true, $columns: repeat(2, 1fr), $gap: 40px);
  @include w(max 250px);
  @include mx(auto);
}
</style>
