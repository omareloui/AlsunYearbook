<script setup lang="ts">
import { useAuthStore } from "~~/store/useAuth";
import type { UpdateMe } from "types";

useHead({ title: "Edit Profile" });

const authStore = useAuthStore();

const error = reactive({
  field: null,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

const formData = reactive({
  username: authStore.user!.username,
  oldPassword: "",
  newPassword: "",
} as UpdateMe);

async function update() {
  const notify = useNotify();

  try {
    const { user, token, refreshToken } = await useTokenedFetch(
      "/api/auth/update-me",
      {
        method: "PUT",
        body: formData,
      }
    );
    authStore.user = user;
    if (token && refreshToken) authStore.setTokens(token, refreshToken);
    notify.success("Updated profile.");
    navigateTo("/yearbook");
  } catch (e) {
    notify.error((e as Error).message);
  }
}
</script>

<template>
  <Container>
    <h1 class="heading">Update my profile</h1>

    <FormBase @submit="update">
      <InputText
        :error="error"
        autofocus
        v-model="formData.username"
        name="username"
        label="Username"
        placeholder="Enter username"
      />

      <InputText
        :error="error"
        type="password"
        v-model="(formData.oldPassword as string)"
        name="oldPassword"
        label="Old Password"
        placeholder="Enter old password"
        minlength="8"
        not-required
      />

      <InputText
        :error="error"
        type="password"
        v-model="(formData.newPassword as string)"
        name="newPassword"
        label="New Password"
        placeholder="Enter new password"
        minlength="8"
        not-required
      />
      <template #submit>Update</template>
    </FormBase>
  </Container>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
  @include mb(30px);
}
</style>
