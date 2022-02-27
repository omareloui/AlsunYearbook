<script setup lang="ts">
const image = ref(null as null | FileList);

async function onSubmit() {
  if (!image.value) return;

  const imageUploader = useImageUploader();

  const url = await imageUploader.upload(image.value);
  console.log(url);
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
