<script setup lang="ts">
import { useMessagesStore } from "~~/store/useMessages";

import MessageInboxCard from "~~/components/Message/InboxCard.vue";

useMeta({ title: "Inbox" });

const messagesStore = useMessagesStore();
await messagesStore.fetchInbox();
messagesStore.readAll();
</script>

<template>
  <Container>
    <h1 class="heading">Inbox</h1>

    <PreviewWithDayGroups
      :data="messagesStore.inbox"
      data-key="message"
      :card-component="MessageInboxCard"
    />

    <YearbookScrollUp />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(30px);
}
</style>
