<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";
import { useMessagesStore } from "~~/store/useMessages";

const authStore = useAuthStore();
const messagesStore = useMessagesStore();
</script>

<template>
  <section class="me">
    <MeSectionCard :to="`/yearbook/${authStore.user.socialMedia.fb}`">
      <IconProfile />
    </MeSectionCard>

    <MeSectionCard to="/inbox">
      <IconInbox :has-notifications="messagesStore.unread.length > 0" />
    </MeSectionCard>

    <MeSectionCard to="/sent-messages">
      <IconSentMessages />
    </MeSectionCard>
  </section>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.me {
  @include grid($center: true, $columns: repeat(3, 1fr), $gap: 20px);
  @include w(max 400px);
  @include mx(auto);

  @include lt-tablet {
    gap: 40px;
  }
}
</style>
