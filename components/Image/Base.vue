<script setup lang="ts">
const { src, borderRadius, isSquare } = withDefaults(
  defineProps<{
    src: string;
    alt: string;
    borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "cr" | "bl";
    isSquare?: boolean;
  }>(),
  { borderRadius: "md", isSquare: false }
);

const emit = defineEmits(["loaded"]);

const imageEl = ref(null as null | HTMLImageElement);
const isLoading = ref(true);

function loadImage() {
  if (!imageEl.value) return;

  const img = new Image();
  img.src = src;
  img.onload = async () => {
    imageEl.value.src = src;
    isLoading.value = false;
    emit("loaded");
  };
}

function getClasses() {
  let classes = "";
  if (borderRadius !== "none")
    classes += ` image-container--br-${borderRadius}`;
  if (isSquare) classes += " image-container--square";
  return classes.trim();
}
onMounted(loadImage);
</script>

<template>
  <div class="image-container" :class="getClasses()">
    <div v-if="isLoading" class="skeleton-overlay"></div>

    <img
      :alt="alt"
      ref="imageEl"
      class="image"
      :class="{ 'image--hidden': isLoading }"
    />

    <slot name="overlay"></slot>

    <slot name="text"></slot>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.image-container {
  @include pos-r;
  overflow: hidden;

  &--square {
    aspect-ratio: 1;
  }

  &--br-sm {
    @include br-sm;
  }

  &--br-md {
    @include br-md;
  }

  &--br-lg {
    @include br-lg;
  }

  &--br-xl {
    @include br-xl;
  }

  &--br-cr {
    @include br-cr;
  }

  &--br-bl {
    @include br-bl;
  }

  .skeleton-overlay {
    @include pos-a(top 0 left 0);
    @include size(100%);
    opacity: 0.7;
    animation: skeleton-loading 1s linear infinite alternate;
  }

  .image {
    object-fit: cover;

    @include block;
    @include size(100%);
    @include tran(opacity);

    &--hidden {
      opacity: 0;
    }
  }
}
</style>
