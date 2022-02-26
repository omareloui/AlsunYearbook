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
    error?: { message: string; field: string; clear: () => void };
  }>(),
  { isLarge: false, notRequired: false }
);

const emit = defineEmits(["update:modelValue", "clearError"]);
const content = useModelWrapper(props, emit);

const hasError = computed(
  () => props.error?.message && props.error.field === props.name
);

function onInput() {
  if (hasError) props.error?.clear();
}
</script>

<template>
  <div class="input-field" :class="{ 'input-field--has-error': hasError }">
    <label :for="identifier || name">{{ label }}</label>
    <div class="input-field__input-container">
      <InputBase
        :id="identifier || name"
        :name="name"
        type="text"
        v-bind="$attrs"
        v-model="content"
        :required="!notRequired"
        @input="onInput"
      />
      <span v-if="!notRequired" class="input-field__required-patch"></span>
    </div>
    <div v-if="error && hasError" class="input-field__error">
      {{ error.message }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.input-field {
  label {
    @include mb(4px);
    @include block;
    @include fw-semibold;
    @include fs-lg;
  }

  &__input-container {
    @include pos-r;
  }

  &__required-patch {
    @include center-v;
    right: 15px;

    @include clr-bg(danger);
    @include size(8px);
    @include br-cr;
  }

  &__error {
    @include clr-txt(input-error);
    @include block;
    @include tran;
    @include fw-bold;
  }

  &--has-error {
    ::v-deep(input) {
      @include clr-bg(input-error, 0.4);
    }
  }
}
</style>
