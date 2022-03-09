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

  @include clr-bg(secondary);
  @include float(3);

  @include br-lg;
  @include pa(20px 15px);

  @include lt-mobile {
    @include px(30px);
  }

  .submit {
    @include mt(20px);
  }
}
</style>
