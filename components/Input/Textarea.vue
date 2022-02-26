<script lang="ts">
export default defineComponent({ inheritAttrs: false });
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    modelValue: string;
    label: string;
    identifier?: string;
    isLarge?: boolean;
    notRequired?: boolean;
  }>(),
  { isLarge: false, notRequired: false }
);

const emit = defineEmits(["update:modelValue"]);
const content = useModelWrapper(props, emit);
</script>

<template>
  <div class="textarea-field">
    <label :for="identifier || name">{{ label }}</label>
    <textarea
      :id="identifier || name"
      :name="name"
      type="text"
      v-bind="$attrs"
      v-model="content"
      :required="!notRequired"
      rows="4"
    ></textarea>
    <span v-if="!notRequired" class="textarea-field__required-patch"></span>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.textarea-field {
  @include pos-r;

  textarea {
    @include brdr(none);
    @include clr-bg(input-bg);
    @include br-lg;
    @include pa(8px 10px);
    @include block;
    @include w(100%);

    resize: vertical;
  }

  label {
    @include mb(4px);
    @include block;
    @include fw-semibold;
    @include fs-lg;
  }

  &__required-patch {
    @include pos-a(right 15px top 3em);
    @include clr-bg(danger);
    @include size(8px);
    @include br-cr;
  }
}
</style>
