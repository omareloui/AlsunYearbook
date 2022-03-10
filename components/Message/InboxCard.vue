<script setup lang="ts">
import type { Message } from "~~/@types";
import { useUserImage } from "~~/composables/useUserImage";
import { useUserFullName } from "~~/composables/useUserFullName";

const { message } = defineProps<{ message: Message }>();

const formattedDate = ref("");
onBeforeMount(async () => {
  const { default: moment } = await import("moment");
  formattedDate.value = moment(message.createdAt).format("h:mm a");
});
</script>

<template>
  <div class="inbox">
    <ImageBase
      class="image"
      :src="!message.isAnonymous ? useUserImage(message.author) : ''"
      :alt="`${
        !message.isAnonymous ? message.author.name.first : 'Anonymous'
      }'s image`"
      is-square
      :is-anonymous="message.isAnonymous"
    />

    <div class="author">
      {{
        (!message.isAnonymous && useUserFullName(message.author)) || "Anonymous"
      }}
    </div>

    <div class="content">
      {{ message.message }}
    </div>

    <div class="time">{{ formattedDate }}</div>

    <div class="favorite">
      <!-- <IconFavorite/> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.inbox {
  @include clr-bg(secondary);
  @include br-lg;
  @include pa(10px);

  @include grid($columns: 50px 1fr auto);
  column-gap: 10px;
  grid-template-areas:
    "image author favorite"
    "image content content"
    "image time time";

  @include lt-tablet {
    @include pa(15px);
    @include grid-cols(80px 1fr auto);
  }

  .image {
    grid-area: image;
  }

  .author {
    grid-area: author;
    @include fs-xl;
    @include fw-bold;

    @include lt-tablet {
      @include fs-2xl;
    }
  }
  .content {
    grid-area: content;
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
