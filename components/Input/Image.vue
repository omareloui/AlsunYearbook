<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string;
    identifier?: string;
    label?: string;
    isMulti?: boolean;
    notRequired?: boolean;
    modelValue: FileList;
    error?: { message: string; field: string; clear: () => void };
  }>(),
  { label: "Select image", name: "image", isMulti: false, notRequired: false }
);

const preview = ref("");
const emit = defineEmits(["update:modelValue"]);

const content = useModelWrapper(props, emit);

function onChange(e: InputEvent) {
  const { files } = e.target as unknown as { files: FileList };
  if (!files.length) {
    content.value = null;
    preview.value = null;
    return;
  }

  content.value = files;
  preview.value = URL.createObjectURL(files[0]);
}
</script>

<template>
  <div class="image-input">
    <transition name="fade">
      <ImageBase
        v-if="preview"
        :src="preview"
        alt="Preview image"
        class="image-input__preview"
      />
    </transition>

    <div class="image-input__input-container">
      <label :for="identifier || name">
        {{ label || "Select image" }}
      </label>

      <input
        :id="identifier || name"
        :name="name"
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/svg+xml"
        :multiple="isMulti"
        @change="onChange"
        :required="!notRequired"
      />
      <span v-if="!notRequired" class="image-input__required-patch"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.image-input {
  input {
    @include remove;
  }

  label {
    @include block;
    @include clr-bg(primary);
    @include br-lg;
    @include pa(10px);
    @include clickable;
    @include fw-bold;
    @include center-text;
  }

  &__preview {
    @include mb(10px);
    @include mx(auto);
    @include w(80%);
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
}
</style>
