<script setup lang="ts">
const image = ref(null as null | FileList);

function onSubmit() {
  if (!image.value) return;

  const imageUploader = useImageUploader();

  imageUploader.upload(image.value);
}
</script>

<template>
  <Container>
    <FormBase @submit="onSubmit">
      <InputImage v-model="image" />

      <template #submit> Upload image </template>
    </FormBase>
  </Container>
</template>
