<script setup lang="ts"></script>

<template>
  <NuxtLayout name="landing">
    <h1 class="heading">Alsun's Yearbook</h1>

    <div class="subheading">
      <div class="subheading__department">Spanish Department</div>
      <div class="subheading__class">Class of 2017/2021</div>
    </div>

    <ImageLandingPage class="alsun-image" />

    <div class="about-us">
      This is for the journey we all shared together. We made a lot of memories
      in those short 4 years, which changed a lot of us. This quarantine made us
      realize how much we could miss that place; not for the studying and
      lectures rather for the friends we made there, at least for the most of
      us.
    </div>

    <div class="action-links">
      <LinkButton
        to="#!"
        is-cta
        is-large
        class="action-links__link action-links__link--cta"
      >
        To The Yearbook
      </LinkButton>
    </div>
  </NuxtLayout>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading,
.subheading,
.about-us,
.action-links {
  text-align: center;
}

.heading,
.subheading :last-child,
.alsun-image,
.about-us {
  @include mb(20px);
}

.alsun-image {
  width: 80%;
  @include mx(auto);
}

.heading {
  line-height: 100%;
}

.subheading {
  @include fs-xl;
  @include fw-bold;
  @include clr-txt(fade);

  :first-child {
    @include mb(5px);
  }
}

.about-us {
  @include mx(auto);
  @include fw-medium;

  max-width: 80%;
}
</style>
