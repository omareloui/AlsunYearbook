<script setup lang="ts">
defineProps<{ isOpen: boolean }>();

const emit = defineEmits(["toggle"]);

function toggle() {
  emit("toggle");
}
</script>

<template>
  <ButtonBase
    class="burger-button"
    :class="{ 'burger-button--open': isOpen }"
    @click="toggle"
  >
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </ButtonBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.burger-button {
  --line-height: 4px;
  --gap: 3px;

  @include clr-bg(none);
  @include brdr(none);
  @include clickable;
  @include size(32px calc(var(--line-height) * 4 + var(--gap) * 2));

  .line {
    @include pos-a(left 0);
    @include size(100% var(--line-height));
    @include clr-bg(text-main);
    @include br-bl;
    @include tran;

    &:first-child {
      top: 0;
    }
    &:nth-child(2) {
      top: calc(var(--line-height) + var(--gap));
    }
    &:last-child {
      top: calc(var(--line-height) * 2 + var(--gap) * 2);
    }
  }

  &--open {
    .line {
      &:nth-child(2) {
        @include w(0);
        opacity: 0;
      }

      &:first-child {
        top: 50%;
        transform: translateY(-50%) rotate(225deg);
      }
      &:last-child {
        top: 50%;
        transform: translateY(-50%) rotate(315deg);
      }
    }
  }
}
</style>
