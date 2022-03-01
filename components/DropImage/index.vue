<script setup lang="ts">
const dropArea = ref(null as null | HTMLDivElement);
const isHighlighted = ref(false);

const emit = defineEmits(["drop"]);

function init() {
  if (!dropArea.value) return;

  const removeDefault = (eventName: string) =>
    dropArea.value.addEventListener(eventName, preventDefaults, false);
  const highlight = (eventName: string) =>
    dropArea.value.addEventListener(eventName, addHighlightStyles, false);
  const unhighlight = (eventName: string) =>
    dropArea.value.addEventListener(eventName, removeHighlightStyles, false);

  ["dragenter", "dragover", "dragleave", "drop"].forEach(removeDefault);
  ["dragenter", "dragover"].forEach(highlight);
  ["dragleave", "drop"].forEach(unhighlight);

  dropArea.value.addEventListener("drop", onDrop, false);
}

function preventDefaults(e: Event) {
  e.preventDefault();
  e.stopPropagation();
}

function addHighlightStyles() {
  isHighlighted.value = true;
}

function removeHighlightStyles() {
  isHighlighted.value = false;
}

function onDrop(e: DragEvent) {
  const files = e.dataTransfer.files;
  emit("drop", files);
}

function removeEvents() {
  if (!dropArea.value) return;

  const removeDefault = (eventName: string) =>
    dropArea.value.removeEventListener(eventName, preventDefaults, false);
  const highlight = (eventName: string) =>
    dropArea.value.removeEventListener(eventName, addHighlightStyles, false);
  const unhighlight = (eventName: string) =>
    dropArea.value.removeEventListener(eventName, removeHighlightStyles, false);

  ["dragenter", "dragover", "dragleave", "drop"].forEach(removeDefault);
  ["dragenter", "dragover"].forEach(highlight);
  ["dragleave", "drop"].forEach(unhighlight);
}

onMounted(init);
onUnmounted(removeEvents);
</script>

<template>
  <div
    class="drop"
    ref="dropArea"
    :class="{ 'drop--highlighted': isHighlighted }"
  >
    <span class="drop__content"><IconDrop /></span>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.drop {
  --height: 100px;
  @include center-text;
  @include h(var(--height));
  @include my(20px);
  @include br-lg;
  @include tran;

  @include float(1);
  @include brdr(primary);

  display: none;

  @include lt-mobile {
    @include grid($center: true);
  }

  &--highlighted {
    @include clr-bg(primary);
    @include brdr(text-main, $style: dashed);
  }

  &__content {
    @include block;
    @include fw-semibold;
    @include fs-lg;
    @include size(calc(var(--height) / 2));

    ::v-deep(svg) {
      @include size(100%);
    }
  }
}
</style>
