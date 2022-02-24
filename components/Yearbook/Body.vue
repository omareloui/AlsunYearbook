<template>
  <div class="yearbook">
    <Container>
      <InputSearch class="yearbook__search" />
    </Container>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.yearbook {
  @include clr-bg(secondary);
  @include float(2);
  @include py(40px);

  &__search {
    @include mx(auto);
    @include w(max 280px);
  }
}
</style>
