<script setup lang="ts">
import { useMessagesStore } from "~~/store/useMessages";

import MessageSentCard from "~~/components/Message/SentCard.vue";

useMeta({ title: "Sent Messages" });

const messagesStore = useMessagesStore();
await messagesStore.fetchSent();
</script>

<template>
  <Container>
    <h1 class="heading">Sent Messages</h1>

    <PreviewWithDayGroups
      :data="messagesStore.sent"
      data-key="message"
      :card-component="MessageSentCard"
    />

    <YearbookScrollUp />
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(20px);
}

.body {
  @include grid($gap: 30px);
  @include pb(30px);
}
</style>
