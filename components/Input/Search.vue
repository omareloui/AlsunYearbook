<script setup lang="ts">
const props = defineProps<{ modelValue: string }>();

const emit = defineEmits(["update:modelValue"]);
const content = useModelWrapper(props, emit);
</script>

<template>
  <InputBase
    type="text"
    placeholder="Type to search..."
    is-large
    v-model="content"
  />
</template>
