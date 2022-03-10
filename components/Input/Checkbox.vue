<script setup lang="ts">
const props = defineProps<{
  name: string;
  modelValue: boolean;
  label: string;
  identifier?: string;
}>();

const emit = defineEmits(["update:modelValue", "clearError"]);
const content = useModelWrapper(props, emit);
</script>

<template>
  <div class="input-checkbox">
    <input
      :id="identifier || name"
      :name="name"
      type="checkbox"
      v-bind="$attrs"
      v-model="content"
    />

    <label :for="identifier || name">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

input {
  @include mr(5px);
}
</style>
