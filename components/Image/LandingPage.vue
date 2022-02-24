<script setup lang="ts">
const isLoading = ref(true);

function onLoaded() {
  isLoading.value = false;
}
</script>

<template>
  <ImageBase
    class="image"
    src="/images/global/homepage.jpg"
    alt="Class image"
    border-radius="lg"
    @loaded="onLoaded"
  >
    <template #overlay>
      <div
        class="fade-overlay"
        :class="{ 'fade-overlay--shown': !isLoading }"
      ></div>
    </template>

    <template #text>
      <div class="text" :class="{ 'text--shown': !isLoading }">
        <div class="line-1">Class of 2021</div>
        <div class="line-2">Spanish Department</div>
      </div>
    </template>
  </ImageBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.image {
  aspect-ratio: 1.5;

  .fade-overlay {
    @include pos-a(top 0 left 0);
    @include size(100% 110%);
    @include tran($timing-function: ease-out-sine);

    background-image: linear-gradient(
      180deg,
      rgba(255, 238, 88, 0) 60%,
      rgba(255, 238, 88, 0.62) 100%
    );
    background-position: 0 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    opacity: 0;

    @include lt-tablet {
      &--shown {
        opacity: 1;
      }
    }
  }

  .text {
    @include tran;
    @include pos-a(top 75% left 4%);
    @include fw-semibold;
    @include fs-2xl;

    opacity: 0;

    :first-child {
      @include mb(5px);
    }

    @include lt-desktop {
      top: 80%;
    }

    @include lt-tablet {
      &--shown {
        opacity: 1;
      }
    }
  }

  &:hover {
    .text {
      top: 110%;
      opacity: 0;
    }

    .fade-overlay {
      background-size: 100% 30%;
    }
  }
}
</style>
