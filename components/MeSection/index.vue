<template>
  <section class="me">
    <MeSectionCard>
      <IconProfile />
    </MeSectionCard>

    <MeSectionCard>
      <IconInbox has-notifications />
    </MeSectionCard>
  </section>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.me {
  @include grid($center: true, $columns: repeat(2, 1fr), $gap: 40px);
  @include w(max 250px);
  @include mx(auto);
}
</style>
