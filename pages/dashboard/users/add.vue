<script setup lang="ts">
import { CreateUser, UserRole } from "~~/@types";

const error = reactive({
  field: null,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

const genderOptions = useUserGender().map(
  g => [g, useCapitalize(g)] as [string, string]
);

// const roleOptions = useUserRole().map(
//   g => [g, useCapitalize(g)] as [string, string]
// );

const roleOptions = [["STUDENT", "Student"]] as [UserRole, string][];

const userData = reactive({
  firstName: "",
  secondName: "",
  thirdName: "",
  nickname: "",

  gender: "FEMALE",
  role: "STUDENT",

  fb: "",
  ig: "",
  twt: "",
  yt: "",

  img: "",
  quote: "",
  currentJob: "",
} as CreateUser);

async function onSubmit() {
  try {
    const { data, error } = await useFetch("/api/users/create", {
      method: "POST",
      body: userData,
    });

    if (error.value) return setError(useParseError(error));

    console.log("success");
    console.log(data.value);

    // useRouter().push("/dashboard/users")
  } catch (e) {
    console.log(e);
    console.log(e.message);
  }
}

function setError(message: string) {
  if (message.match(/facebook/i)) error.field = "facebook";
  else if (message.match(/instagram/i)) error.field = "instagram";
  else if (message.match(/twitter/i)) error.field = "twitter";
  else if (message.match(/youtube/i)) error.field = "youtube";
  else if (message.match(/with the same name/i)) error.field = "firstName";

  if (!error.field) return;

  error.message = message;

  useNotify().error(error.message);
}
</script>

<template>
  <Container>
    <h1 class="heading">Add User</h1>

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
        :error="error"
        name="instagram"
        label="Instagram"
        placeholder="Enter Instagram's link or id"
        v-model="userData.ig"
        not-required
      />
      <InputText
        :error="error"
        name="twitter"
        label="Twitter"
        placeholder="Enter Twitter's link or id"
        v-model="userData.twt"
        not-required
      />
      <InputText
        :error="error"
        name="youtube"
        label="YouTube"
        placeholder="Enter YouTube's channel link or id"
        v-model="userData.yt"
        not-required
      />

      <LineBreak margin="var(--line-margin)" />

      <h2>Image, Quote and Job</h2>
      <InputText
        name="image"
        label="Image"
        placeholder="Enter image title"
        v-model="userData.img"
      />
      <InputTextarea
        name="quote"
        label="Quote"
        placeholder="Enter a quote"
        v-model="userData.quote"
      />
      <InputTextarea
        name="job"
        label="Current job"
        placeholder="Enter the current job"
        v-model="userData.currentJob"
        not-required
      />

      <template #submit>
        <IconAddUser />
        Add User
      </template>
    </FormBase>
  </Container>
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
