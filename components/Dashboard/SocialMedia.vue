<script setup lang="ts">
import { User } from "~~/@types";

defineProps<{ user: User }>();
</script>

<template>
  <div class="social-media">
    <div class="social-media__link">
      <span class="icon"><IconFaceBook /></span>
      <LinkBase :to="`https://facebook.com/${user.socialMedia.fb}`" class="link"
        >/{{ user.socialMedia.fb }}</LinkBase
      >
    </div>

    <div class="social-media__link" v-if="user.socialMedia.ig">
      <span class="icon"><IconInstagram /></span>
      <LinkBase
        :to="`https://instagram.com/${user.socialMedia.ig}`"
        class="link"
        >/{{ user.socialMedia.ig }}</LinkBase
      >
    </div>

    <div class="social-media__link" v-if="user.socialMedia.twt">
      <span class="icon"><IconTwitter /></span>
      <LinkBase :to="`https://twitter.com/${user.socialMedia.twt}`" class="link"
        >/{{ user.socialMedia.twt }}</LinkBase
      >
    </div>

    <div class="social-media__link" v-if="user.socialMedia.yt">
      <span class="icon"><IconYouTube /></span>
      <LinkBase
        :to="`https://youtube.com/channel/${user.socialMedia.yt}`"
        class="link"
        >/channel/{{ user.socialMedia.yt }}</LinkBase
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.social-media {
  @include flex($center: true, $gap: 12px, $wrap: true, $center-v: true);
  @include ma(20px auto);
  @include w(fit-content);

  &__link {
    @include flex($gap: 4px);
    align-items: center;

    .icon {
      @include pos-r;
      @include size(18px);

      ::v-deep(svg) {
        @include center;
        @include size(100%);
      }
    }

    .link {
      @include clr-txt;
      @include no-underline;
      @include fw-semibold;
    }
  }
}
</style>
