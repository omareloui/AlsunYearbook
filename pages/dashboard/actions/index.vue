<script setup lang="ts">
const image = ref(null as null | FileList);

async function onSubmit() {
  if (!image.value) return;

  const imageUploader = useImageUploader();
  const notify = useNotify();

  try {
    console.log("uploading...");
    const { original, thumbnail } = await imageUploader.upload(image.value);
    console.log(original);
    console.log(thumbnail);
  } catch (e) {
    notify.error(e.message);
  }
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
