<script setup lang="ts">
import { useUsersStore } from "~~/store/useUsers";
import { useUserIsInYearbook } from "~~/composables/useUserIsInYearbook";

import type {
  User,
  CreateUser,
  UserGender,
  UserRole,
  UserAuthority,
} from "~~/@types";

const usersStore = useUsersStore();

const error = reactive({
  field: null,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

const genderOptions = useUserGender().map(
  g => [g, useCapitalize(g)] as [UserGender, string]
);

const roleOptions = useUserRole().map(
  r => [r, useCapitalize(r)] as [UserRole, string]
);

const authorityRoleOptions = useUserAuthorityRole().map(
  r => [r, useCapitalize(r)] as [UserAuthority, string]
);

const image = ref(null);
const isUploadingImage = ref(false);

const { userToEdit } = defineProps<{ userToEdit?: User }>();

const isEdit = computed(() => !!userToEdit);
const isImageRequired = computed(() => {
  if (
    isEdit.value &&
    !useUserIsInYearbook(userToEdit.role) &&
    isInYearbook.value
  )
    return true;
  if (!isInYearbook.value || isEdit.value) return false;
});

const userData = reactive({
  _id: userToEdit?._id.toString() || null,
  firstName: userToEdit?.name.first || "",
  secondName: userToEdit?.name.second || "",
  thirdName: userToEdit?.name.third || "",
  nickname: userToEdit?.name.nickname || "",

  gender: userToEdit?.gender || "FEMALE",
  role: userToEdit?.role || "STUDENT",
  authorityRole: userToEdit?.authorityRole || "USER",

  fb: userToEdit?.socialMedia.fb || "",
  ig: userToEdit?.socialMedia.ig || "",
  twt: userToEdit?.socialMedia.twt || "",
  yt: userToEdit?.socialMedia.yt || "",

  image: null,
  thumbnail: null,

  quote: userToEdit?.quote || "",
  currentJob: userToEdit?.currentJob || "",
} as CreateUser);

const isInYearbook = computed(() => useUserIsInYearbook(userData.role));

async function submitEdit() {
  const notify = useNotify();
  const imageUploader = useImageUploader();

  try {
    if (isImageRequired.value && !image.value)
      throw new Error("You have to select an image");

    const requestOptions = { method: "POST", body: userData };

    if (isInYearbook.value) {
      if (image.value) {
        await useCustomFetch("/api/users/validate-edit", requestOptions);
        notify.info("Uploading the image. That could take a while.");
        isUploadingImage.value = true;
        const { original, thumbnail } = await imageUploader.upload(image.value);

        userData.image = original;
        userData.thumbnail = thumbnail;
      }
    } else {
      userData.image = undefined;
      userData.thumbnail = undefined;
      userData.quote = undefined;
      userData.currentJob = undefined;
    }

    const user = await useCustomFetch("/api/users/edit", requestOptions);

    notify.success(`Edited ${user.name.first} successfully.`);

    usersStore.updateUser(user);

    navigateTo(`/dashboard/users/${user.socialMedia.fb}`);
  } catch (e) {
    setError(e.message);
    notify.error(e.message);
  } finally {
    isUploadingImage.value = false;
  }
}

async function submitCreate() {
  const notify = useNotify();
  const imageUploader = useImageUploader();

  try {
    if (isInYearbook.value && !image.value)
      throw new Error("You have to select an image");

    const requestOptions = { method: "POST", body: userData };

    if (isInYearbook.value) {
      await useCustomFetch("/api/users/validate-create", requestOptions);
      notify.info("Uploading the image. That could take a while.");
      isUploadingImage.value = true;
      const { original, thumbnail } = await imageUploader.upload(image.value);

      userData.image = original;
      userData.thumbnail = thumbnail;
    } else {
      userData.image = undefined;
      userData.thumbnail = undefined;
      userData.quote = undefined;
      userData.currentJob = undefined;
    }

    const user = (await useCustomFetch(
      "/api/users/create",
      requestOptions
    )) as User;

    notify.success(`Added ${user.name.first} successfully.`);

    // TODO: Add user to the store if needed.

    navigateTo(`/dashboard/users/${user.socialMedia.fb}`);
  } catch (e) {
    setError(e.message);
    notify.error(e.message);
  } finally {
    isUploadingImage.value = false;
  }
}

async function onSubmit() {
  if (isEdit.value) return submitEdit();
  return submitCreate();
}

function setError(message: string) {
  const setField = (stringToMatch: string) =>
    message.match(stringToMatch) && (error.field = stringToMatch);

  ["facebook", "instagram", "twitter", "youtube", "image"].forEach(setField);
  if (message.match(/with the same name/i)) error.field = "firstName";

  if (!error.field) return;

  error.message = message;
}
</script>

<template>
  <FormBase @submit="onSubmit">
    <h2>Name</h2>
    <InputText
      :error="error"
      name="firstName"
      label="First name"
      placeholder="Enter first name"
      v-model="userData.firstName"
    />
    <InputText
      :error="error"
      name="secondName"
      label="Second name"
      placeholder="Enter second name"
      v-model="userData.secondName"
    />
    <InputText
      :error="error"
      name="thirdName"
      label="Third name"
      placeholder="Enter third name"
      v-model="userData.thirdName"
      not-required
    />
    <InputText
      name="nickname"
      label="Nickname"
      placeholder="Enter nickname"
      v-model="userData.nickname"
      not-required
    />

    <LineBreak margin="var(--line-margin)" />

    <h2>Gender and Role</h2>
    <InputSelect
      name="gender"
      label="Gender"
      v-model="userData.gender"
      :options="genderOptions"
    />
    <InputSelect
      name="role"
      label="Role"
      v-model="userData.role"
      :options="roleOptions"
    />
    <InputSelect
      v-if="isEdit"
      name="authorityRole"
      label="Authority Role"
      v-model="userData.authorityRole"
      :options="authorityRoleOptions"
    />

    <LineBreak margin="var(--line-margin)" />

    <h2>Social Media</h2>
    <InputText
      :error="error"
      name="facebook"
      label="Facebook"
      placeholder="Enter FaceBook's link or id"
      v-model="userData.fb"
    />
    <InputText
      v-if="isInYearbook"
      :error="error"
      name="instagram"
      label="Instagram"
      placeholder="Enter Instagram's link or id"
      v-model="userData.ig"
      not-required
    />
    <InputText
      v-if="isInYearbook"
      :error="error"
      name="twitter"
      label="Twitter"
      placeholder="Enter Twitter's link or id"
      v-model="userData.twt"
      not-required
    />
    <InputText
      v-if="isInYearbook"
      :error="error"
      name="youtube"
      label="YouTube"
      placeholder="Enter YouTube's channel link or id"
      v-model="userData.yt"
      not-required
    />

    <LineBreak margin="var(--line-margin)" v-if="isInYearbook" />

    <h2 v-if="isInYearbook">Image, Quote and Job</h2>
    <InputImage
      v-if="isInYearbook"
      v-model="image"
      :error="error"
      :is-uploading="isUploadingImage"
      has-drop-area
      :not-required="!isImageRequired"
    />
    <InputTextarea
      v-if="isInYearbook"
      name="quote"
      label="Quote"
      placeholder="Enter a quote"
      v-model="userData.quote"
      :not-required="!isInYearbook"
    />
    <InputTextarea
      v-if="isInYearbook"
      name="job"
      label="Current job"
      placeholder="Enter the current job"
      v-model="userData.currentJob"
      not-required
    />

    <template #submit>
      <IconAddUser v-if="!isEdit" />
      <span v-if="!isEdit">Add User</span>

      <IconSettings v-if="isEdit" />
      <span v-if="isEdit">Submit editing {{ userData.firstName }}</span>
    </template>
  </FormBase>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.heading {
  @include center-text;
}

form {
  --line-margin: 20px;

  @include mt(20px);
  @include mb(40px);

  h2 {
    @include center-text;
    @include fs-4xl;
  }
}
</style>
