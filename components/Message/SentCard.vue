<script setup lang="ts">
import type { Message } from "~~/@types";
import { useUserHelpers } from "~~/composables/useUserHelpers";

const { message } = defineProps<{ message: Message }>();

const receiverHelpers = useUserHelpers(message.receiver);

const formattedDate = ref("");
onBeforeMount(async () => {
  const { default: moment } = await import("moment");
  formattedDate.value = moment(message.createdAt).format("h:mm a");
});
</script>

<template>
  <div class="sent-message">
    <ImageBase
      :src="receiverHelpers.image"
      :alt="`${message.receiver.name.first}'s image`"
      class="image"
      is-square
    />

    <div class="sent-to">
      <IconAnonymous
        v-if="message.isAnonymous"
        class="sent-to__anonymous-icon"
        color="var(--clr-text-fade)"
      />
      <span class="sent-to__to">To</span>
      <span class="sent-to__name">{{ receiverHelpers.fullName }}</span>
    </div>

    <div class="content">
      {{ message.message }}
    </div>

    <div class="read-status">
      <IconRead v-if="message.isRead" color="var(--clr-text-fade)" />
      <IconNotRead v-else color="var(--clr-text-fade)" />
    </div>

    <div class="time">{{ formattedDate }}</div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.sent-message {
  @include clr-bg(secondary);
  @include br-lg;
  @include pa(10px);

  @include grid($columns: 50px 1fr auto);
  column-gap: 10px;
  grid-template-areas:
    "image sent-to read-status"
    "image content content"
    "image time time";

  @include lt-tablet {
    @include pa(15px);
    @include grid-cols(80px 1fr auto);
  }

  .image {
    grid-area: image;
  }

  .read-status {
    grid-area: read-status;
    @include size(20px);
  }

  .sent-to {
    grid-area: sent-to;
    @include mb(3px);

    &__anonymous-icon {
      @include size(15px);
      @include mr(3px);

      @include lt-tablet {
        @include size(20px);
      }
    }

    &__to {
      @include fs-lg;
      @include clr-txt(fade);
      @include mr(5px);

      @include lt-tablet {
        @include fs-xl;
      }
    }

    &__name {
      @include fs-xl;
      @include fw-bold;

      @include lt-tablet {
        @include fs-2xl;
      }
    }
  }

  .content {
    grid-area: content;
    white-space: pre-wrap;
    @include clr-txt(main, 0.85);
    @include fw-semibold;
    @include break-word;
  }

  .time {
    grid-area: time;
    @include clr-txt(fade);
    @include fs-xs;
    @include fix-numbers;
    text-align: end;

    @include lt-tablet {
      @include fs-sm;
    }
  }
}
</style>
