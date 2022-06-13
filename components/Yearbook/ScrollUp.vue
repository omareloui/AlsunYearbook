<script setup lang="ts">
const isScrolled = ref(false);

const scrollToTop = useScrollToTop();

function init() {
  addEventListener("scroll", checkIfIsScrolled);
}
function destroy() {
  removeEventListener("scroll", checkIfIsScrolled);
}

function checkIfIsScrolled() {
  isScrolled.value = scrollY > 500;
}

onMounted(init);
onUnmounted(destroy);
</script>

<template>
  <transition name="fade">
    <ButtonBase v-if="isScrolled" class="scroll-up" @click="scrollToTop">
      <IconScrollUp color="var(--clr-text-dark)" />
    </ButtonBase>
  </transition>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.scroll-up {
  @include pos-f(bottom 30px right 20px);

  @include size(70px);
  @include pa(15px);

  @include brdr(none);
  @include br-cr;

  @include clr-bg(primary, 0.3);
  @include remove-android-highlight;
  backdrop-filter: blur(4px);

  @include lt-mobile {
    @include size(80px);
    @include pa(20px);
  }

  ::v-deep(svg) {
    @include size(100%);
  }
}
</style>
