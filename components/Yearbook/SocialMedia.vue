<script setup lang="ts">
import { UserSocialMedia } from "~~/@types";

defineProps<{ sm: UserSocialMedia }>();
</script>

<template>
  <div class="social-media">
    <LinkBase
      v-if="sm.fb"
      class="social-media__link"
      new-tab
      :to="`https://facebook.com/${sm.fb}`"
    >
      <IconFaceBook />
    </LinkBase>
    <LinkBase
      v-if="sm.ig"
      class="social-media__link"
      new-tab
      :to="`https://instagram.com/${sm.ig}`"
    >
      <IconInstagram />
    </LinkBase>
    <LinkBase
      v-if="sm.twt"
      class="social-media__link"
      new-tab
      :to="`https://twitter.com/${sm.twt}`"
    >
      <IconTwitter />
    </LinkBase>
    <LinkBase
      v-if="sm.yt"
      class="social-media__link"
      new-tab
      :to="`https://youtube.com/channel/${sm.yt}`"
    >
      <IconTwitter />
    </LinkBase>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.social-media {
  @include flex($center: true, $gap: 20px, $space-around: true, $wrap: true);
  @include w(fit-content);
  @include mx(auto);

  &__link {
    @include inline-block;
    @include clr-bg(primary);
    @include br-lg;

    @include size(45px);
    @include pa(8px);

    @include lt-tablet {
      @include size(60px);
      @include pa(12px);
    }
  }
}
</style>
