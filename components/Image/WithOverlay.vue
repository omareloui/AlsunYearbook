<script setup lang="ts">
const isLoading = ref(true);

defineProps<{ src: string; alt: string; lineOne?: string; lineTwo?: string }>();
const emit = defineEmits(["loaded"]);

function onLoaded() {
  isLoading.value = false;
  emit("loaded");
}
</script>

<template>
  <ImageBase class="image" :src="src" :alt="alt" @loaded="onLoaded">
    <template #overlay>
      <div
        class="fade-overlay"
        :class="{ 'fade-overlay--hidden': isLoading }"
      ></div>
    </template>

    <template #text>
      <div v-if="lineOne || lineTwo" class="text">
        <div
          v-if="lineOne"
          class="text__line text__line-1"
          :class="{ 'text__line--hidden': isLoading }"
        >
          {{ lineOne }}
        </div>
        <div
          v-if="lineTwo"
          class="text__line text__line-2"
          :class="{ 'text__line--hidden': isLoading }"
        >
          {{ lineTwo }}
        </div>

        <div
          v-if="lineOne && isLoading"
          class="text__loading-line text__loading-line--1"
        ></div>
        <div
          v-if="isLoading && lineTwo"
          class="text__loading-line text__loading-line--2"
        ></div>
      </div>
    </template>
  </ImageBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.image {
  .fade-overlay {
    @include pos-a(bottom -10px left 0);
    @include size(100% 66.666%);
    @include tran($timing-function: ease-out-sine);

    background-image: linear-gradient(
      180deg,
      rgba(255, 238, 88, 0) 0%,
      rgba(255, 238, 88, 0.56) 100%
    );
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &--hidden {
      opacity: 0;
    }
  }

  .text {
    @include tran;
    @include pos-a(bottom 4% left 4%);
    @include fw-black;
    @include fs-lg;
    @include uppercase;
    @include w(100%);

    &__line {
      &--hidden {
        opacity: 0;
      }
    }

    &__loading-line,
    &__loading-line {
      @include size(30% 25px);
      @include br-md;

      animation: skeleton-loading 1s linear infinite alternate;

      &--2 {
        @include mt(8px);
        @include w(50%);
      }
    }
  }

  @include lt-mobile {
    @media (hover: hover) {
      &:hover {
        .text {
          bottom: -40%;
          opacity: 0;
        }

        .fade-overlay {
          background-size: 100% 0%;
        }
      }
    }
  }
}
</style>
