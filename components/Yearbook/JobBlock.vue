<script setup lang="ts">
defineProps<{ job: string }>();
</script>

<template>
  <div class="job">{{ job }}</div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.job {
  word-break: break-word;
  @include ma(30px auto);
  @include center-text;

  @include w(100%);
  @include w(max 800px);

  @include lt-tablet {
    @include w(80%);
  }
}
</style>
