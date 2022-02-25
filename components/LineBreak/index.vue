<script setup lang="ts">
withDefaults(defineProps<{ margin?: string; width?: string }>(), {
  margin: "0px",
  width: "80%",
});
</script>

<template>
  <hr :style="{ 'margin-top': margin, 'margin-bottom': margin, width }" />
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

hr {
  border: none;
  @include h(1px);
  @include br-bl;
  @include clr-bg(text-main);
  @include mx(auto);

  opacity: 0.1;
}
</style>
