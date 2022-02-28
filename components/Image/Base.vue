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
const notFound = ref(false);
const imageContainerClasses = ref("");

let observer: IntersectionObserver;

async function loadImage() {
  if (!imageEl.value) return;

  try {
    await useLoadImage(src, imageEl.value);
  } catch (e) {
    notFound.value = true;
    addClassToContainer("not-found");
  } finally {
    isLoading.value = false;
    emit("loaded");
  }
}

function addClassToContainer(containerClass: string) {
  imageContainerClasses.value += ` image-container--${containerClass}`;
  imageContainerClasses.value.trim();
}

function setContainerClasses() {
  if (borderRadius !== "none") addClassToContainer(`br-${borderRadius}`);
  if (isSquare) addClassToContainer("square");
}

setContainerClasses();

function addIntersectionObserver() {
  observer = new IntersectionObserver((entries, _observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || !isLoading.value) return;
      loadImage();
    });
  });
  observer.observe(imageEl.value);
}

function removeObserver() {
  if (!observer) return;
  observer.disconnect();
}

onMounted(addIntersectionObserver);
onUnmounted(removeObserver);
</script>

<template>
  <div class="image-container" :class="imageContainerClasses">
    <div v-if="isLoading" class="skeleton-overlay"></div>

    <transition name="fade">
      <IconNotFound v-if="notFound" class="not-found-icon"></IconNotFound>
    </transition>

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
  @include tran(background);
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
    opacity: 0.4;
    animation: skeleton-loading 1s linear infinite alternate;
  }

  .not-found-icon {
    @include center;
    @include size(20%);
  }

  .image {
    object-fit: cover;

    @include block;
    @include size(100%);
    @include tran(opacity);
  }

  &--not-found .image,
  .image--hidden {
    opacity: 0;
  }

  &--not-found {
    @include clr-bg(error, 0.8);
  }
}
</style>
