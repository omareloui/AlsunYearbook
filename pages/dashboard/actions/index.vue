<script setup lang="ts">
const image = ref(null);

function onSubmit() {
  console.log(image.value);
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
