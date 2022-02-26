<script setup lang="ts">
const emit = defineEmits(["submit"]);
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <slot></slot>

    <InputSubmit class="submit">
      <slot name="submit"></slot>
    </InputSubmit>
  </form>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

form {
  @include grid($gap: 10px);
  @include w(max 600px);
  @include mx(auto);

  .submit {
    @include mt(20px);
  }
}
</style>
