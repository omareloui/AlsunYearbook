<script setup lang="ts">
defineProps<{ quote: string }>();
</script>

<template>
  <div class="quote-container">
    <IconOpenQuote
      class="quote-icon quote-icon--open"
      color="var(--clr-light-100)"
    />
    <IconCloseQuote
      class="quote-icon quote-icon--close"
      color="var(--clr-light-100)"
    />
    <q class="quote">{{ quote }}</q>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.quote-container {
  --quote-icon-offset: -20px;

  @include pos-r;
  @include clr-bg(secondary);
  @include br-lg;
  @include pa(15px 25px);
  @include ma(20px auto);
  @include center-text;

  @include w(calc(100% - 50px));
  @include w(max 600px);

  @include lt-tablet {
    @include w(60%);
  }

  q {
    isolation: isolate;
    word-break: break-word;

    @include fw-semibold;

    &::before,
    &::after {
      content: "";
    }
  }

  .quote-icon {
    @include pos-a;
    @include w(50px);

    &--open {
      top: var(--quote-icon-offset);
      left: var(--quote-icon-offset);
    }

    &--close {
      bottom: var(--quote-icon-offset);
      right: var(--quote-icon-offset);
    }
  }
}
</style>
