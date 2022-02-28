<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string;
    identifier?: string;
    label?: string;
    notRequired?: boolean;
    modelValue: FileList;
    error?: { message: string; field: string; clear: () => void };
    hasDropArea?: boolean;
    isUploading?: boolean;
  }>(),
  {
    label: "Select image",
    name: "image",
    notRequired: false,
    isUploading: false,
    hasDropArea: false,
  }
);

const previewImageContainer = ref(null as null | HTMLElement);
const preview = ref("");
const emit = defineEmits(["update:modelValue"]);

const content = useModelWrapper(props, emit);

const hasError = computed(
  () => props.error?.message && props.error.field === props.name
);

async function onChange(e: InputEvent) {
  if (hasError) props.error?.clear();

  const { files } = e.target as unknown as { files: FileList };
  updateSelected(files);
}

async function updateSelected(files: FileList) {
  if (!files.length) {
    content.value = null;
    preview.value = null;
  } else {
    content.value = files;
    preview.value = URL.createObjectURL(files[0]);
  }

  await reloadImage();
}

async function reloadImage() {
  if (!previewImageContainer.value) return;

  const imageEl = previewImageContainer.value.querySelector("img");
  if (!imageEl) return;

  try {
    await useLoadImage(preview.value || "", imageEl);
  } catch (e) {
    previewImageContainer.value
      .querySelector(".image-container")
      ?.classList.add("image-container--not-found");
  }
}

function onDrop(files: FileList) {
  updateSelected(files);
}
</script>

<template>
  <div
    class="image-input"
    :class="{
      'image-input--has-error': hasError,
    }"
  >
    <transition name="fade">
      <div class="preview" v-if="preview" ref="previewImageContainer">
        <ImageBase
          :src="preview"
          alt="Preview image"
          class="preview__image"
          is-square
        />
        <transition name="fade">
          <div v-if="isUploading" class="preview__upload-overlay">
            <IconUpload />
          </div>
        </transition>
      </div>
    </transition>

    <DropImage v-if="hasDropArea" @drop="onDrop" />

    <div class="image-input__input-container">
      <label :for="identifier || name">
        {{ label || "Select image" }}
      </label>

      <input
        :id="identifier || name"
        :name="name"
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/svg+xml"
        @change="onChange"
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
    @include tran;
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

  &--has-error {
    label {
      @include clr-bg(danger);
    }
  }

  .preview {
    @include pos-r;
    @include mb(10px);
    @include mx(auto);
    @include w(80%);

    &__upload-overlay {
      @include pos-a(top 0 left 0);
      @include size(100%);
      @include br-md;
      @include not-clickable;
      @include grid($center: true);

      background-image: linear-gradient(
        180deg,
        rgba(255, 238, 88, 0) 0%,
        rgba(255, 238, 88, 0.56) 100%
      );
      background-position: 0 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;

      ::v-deep(svg) {
        @include size(20%);
        animation: upload-icon 750ms ease-in-out infinite alternate;
        opacity: 0.9;
      }
    }
  }
}
</style>
