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
      class="sent-message__image"
      is-square
    />

    <div class="sent-message__body">
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
    </div>

    <div class="sent-message__info">
      <div class="read-status">
        <IconRead v-if="message.isRead" color="var(--clr-text-fade)" />
        <IconNotRead v-else color="var(--clr-text-fade)" />
      </div>

      <div class="time">{{ formattedDate }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.sent-message {
  @include clr-bg(secondary);
  @include grid($columns: 50px 1fr auto, $gap: 10px);
  @include br-lg;
  @include pa(10px);

  @include lt-tablet {
    gap: 15px;
    @include pa(15px);
    @include grid-cols(80px 1fr auto);
  }

  &__info {
    @include flex($invert-dir: true, $space-between: true);
    align-items: flex-end;

    .read-status {
      @include size(20px);
    }

    .time {
      @include clr-txt(fade);
      @include fs-xs;
      @include fix-numbers;

      @include lt-tablet {
        @include fs-sm;
      }
    }
  }

  &__body {
    .sent-to {
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
      @include clr-txt(main, 0.85);
      @include fw-semibold;
    }
  }
}
</style>
