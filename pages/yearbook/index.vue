<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";
import { useYearbookStore } from "~~/store/useYearbook";
import { useMessagesStore } from "~~/store/useMessages";

useMeta({ title: "Alsun Yearbook" });

const authStore = useAuthStore();
const yearbookStore = useYearbookStore();
const messagesStore = useMessagesStore();

if (authStore.isInYearbook) await messagesStore.fetchUnread();

yearbookStore.setSectionOnLoad();
await yearbookStore.fetchCurrentSection();
await yearbookStore.fetchMyCloseFriends();
yearbookStore.setShown();
</script>

<template>
  <div>
    <Container tag="main">
      <MeSection v-if="authStore.isInYearbook" />

      <YearbookSectionsSelection />
    </Container>

    <YearbookBody />
    <YearbookScrollUp />
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;
</style>
