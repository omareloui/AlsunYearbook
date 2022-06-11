<template>
  <transition name="loader">
    <div class="loader">
      <div class="loader__spinner"></div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.loader {
  display: grid;
  place-items: center;

  &__spinner {
    --size: 50px;
    @include size(var(--size));
    @include br-cr;
    @include pos-r;
    @include inline-block;

    animation: rotation 1s linear infinite;

    &:after {
      content: "";
      @include center;
      @include size(var(--size));
      @include br-cr;
      @include brdr(none, 5px);
      @include clr(primary, border-bottom-color);
    }
  }
}

@keyframes rotation {
  100% {
    transform: rotate(360deg);
  }
}
</style>
