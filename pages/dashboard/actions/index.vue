<script setup lang="ts">
const image = ref(null as null | FileList);
const isUploading = ref(false);

async function onSubmit() {
  if (!image.value) return;

  const imageUploader = useImageUploader();
  const notify = useNotify();

  try {
    notify.info("Uploading...");

    isUploading.value = true;
    await imageUploader.upload(image.value);

    notify.success("uploaded the image successfully");
  } catch (e) {
    notify.error(e.message);
  } finally {
    isUploading.value = false;
  }
}
</script>

<template>
  <Container>
    <FormBase @submit="onSubmit">
      <InputImage v-model="image" :is-uploading="isUploading" />

      <template #submit>Upload image</template>
    </FormBase>
  </Container>
</template>
