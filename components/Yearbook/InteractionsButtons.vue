<template>
  <div class="interactions-buttons">
    <ButtonBase class="interactions-buttons__button">
      <IconCloseFriend />
      Add close friend
    </ButtonBase>
    <ButtonBase class="interactions-buttons__button">
      <IconWrite />
      Leave a message
    </ButtonBase>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.interactions-buttons {
  @include flex($center: true, $gap: 15px, $space-around: true, $wrap: true);
  @include w(fit-content);
  @include mx(auto);

  &__button {
    @include flex($gap: 10px, $center: true);
    @include clr-bg(primary);
    @include brdr(none);
    @include br-lg;
    @include pa(8px 10px);
    @include fw-bold;

    ::v-deep(svg) {
      @include size(25px);
    }
  }
}
</style>
