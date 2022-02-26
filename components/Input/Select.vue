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
    options: string[] | [string, string][];
    placeholder?: string;
  }>(),
  { isLarge: false, notRequired: false }
);

const emit = defineEmits(["update:modelValue"]);
const content = useModelWrapper(props, emit);
</script>

<template>
  <div class="input-select">
    <label :for="identifier || name">{{ label }}</label>

    <select
      :id="identifier || name"
      :name="name"
      v-bind="$attrs"
      v-model="content"
      :required="!notRequired"
    >
      <option v-if="placeholder" disabled selected>{{ placeholder }}</option>
      <option
        v-if="typeof options[0] === 'object'"
        v-for="option in options"
        :value="option[0]"
      >
        {{ option[1] }}
      </option>
      <option v-else v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
    <span v-if="!notRequired" class="input-select__required-patch"></span>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.input-select {
  @include pos-r;

  select {
    @include brdr(none);
    @include clr-bg(input-bg);
    @include br-lg;
    @include pa(8px 10px);
    @include block;
    @include w(100%);
  }

  label {
    @include mb(4px);
    @include block;
    @include fw-semibold;
    @include fs-lg;
  }

  &__required-patch {
    @include pos-a(right 15px bottom 1.1em);
    @include clr-bg(danger);
    @include size(8px);
    @include br-cr;
  }
}
</style>
