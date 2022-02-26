<script setup lang="ts">
const props = withDefaults(
  defineProps<{ modelValue: string; isLarge?: boolean }>(),
  { isLarge: false }
);

const emit = defineEmits(["update:modelValue"]);

const content = useModelWrapper(props, emit);
</script>

<template>
  <input type="text" v-model="content" />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

input {
  @include brdr(none);
  @include clr-bg(input-bg);
  @include br-lg;
  @include pa(8px 10px);
  @include block;
  @include w(100%);

  &.large {
    @include fs-lg;
    @include fw-bold;
  }
}
</style>
