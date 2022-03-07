<script setup lang="ts">
import Cookie from "cookie-universal";

// import { config } from "~~/server/config";
import type { Authentication, Token } from "~~/@types";

type SignType = "in" | "up";

const { type } = defineProps<{ type: SignType }>();

const confirmedFbId = ref(null);

const formData = reactive({
  fbId: "",
  username: "",
  password: "",
});

const error = reactive({
  field: null,
  message: "",
  clear: () => {
    error.message = "";
    error.field = null;
  },
});

async function checkFBId() {
  const notify = useNotify();
  try {
    const data = await useCustomFetch(`/api/auth/check-fb?id=${formData.fbId}`);
    confirmedFbId.value = data;
  } catch (e) {
    notify.error(e.message, { duration: 5000 });
  }
}

async function sign() {
  const notify = useNotify();

  try {
    const data = (await useCustomFetch(`/api/auth/sign${type}`, {
      method: "POST",
      body: { ...formData, fbId: confirmedFbId.value },
    })) as Authentication;

    notify.success("Signed up.");
    useRouter().push("/yearbook");
  } catch (e) {
    setError(e.message);
    notify.error(e.message, { duration: 5000 });
  }
}

function setError(message: string) {
  // if (
  //   message.match(
  //     "This facebook account doesn't exist in the yearbook. You can't signup."
  //   ) ||
  //   message.match("You are registered already. Try signing in instead.")
  // )
  //   error.field = "facebookId";

  if (!error.field) return;

  error.message = message;
}
</script>

<template>
  <div>
    <transition name="fade" mode="out-in">
      <div class="form-container">
        <FormBase v-if="type === 'up' && !confirmedFbId" @submit="checkFBId">
          <InputText
            :error="error"
            autofocus
            v-model="formData.fbId"
            name="facebookId"
            label="Facebook profile"
            placeholder="Enter your Facebook profile link"
          />
          <p>
            First we need to check if you're part of the yearbook or not.
            Please, enter your Facebook profile link.
          </p>
          <template #submit>Check link</template>
        </FormBase>
      </div>
    </transition>

    <transition name="fade" mode="out-in">
      <FormBase
        v-if="type === 'in' || (type === 'up' && confirmedFbId)"
        @submit="sign"
      >
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
          v-model="formData.password"
          name="password"
          label="Password"
          placeholder="Enter password"
          minlength="8"
        />
        <template #submit>Sign{{ type }}</template>
      </FormBase>
    </transition>

    <div class="sign-instead">
      <LinkBase :to="type === 'in' ? '/signup' : 'signin'">
        Sign{{ type === "in" ? "up" : "in" }} instead?
      </LinkBase>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.form-container {
  p {
    @include center-text;
  }
}

.sign-instead {
  @include center-text;
  @include mt(20px);

  ::v-deep(a) {
    @include clr-txt;
    @include fs-sm;
  }
}
</style>
