<script setup lang="ts">
import type { SendMessage, User, FetchError } from "types";
import { useCapitalize } from "~~/composables/useCapitalize";
import { useMessagesStore } from "~~/store/useMessages";

const emit = defineEmits(["close"]);
const props = defineProps<{ user: User }>();

const messagesStore = useMessagesStore();

let isSending = false;
const formData = reactive({
  message: "",
  receiver: props.user._id.toString(),
  isAnonymous: false,
} as SendMessage);

async function sendMessage() {
  if (isSending) return;
  isSending = true;
  const sleep = useSleep();
  const notify = useNotify();

  try {
    await messagesStore.send(formData);
    notify.success("Sent message.");
    emit("close");
  } catch (err) {
    const e = err as FetchError;
    notify.error(e.data.message);
  } finally {
    await sleep(500);
    isSending = false;
  }
}
</script>

<template>
  <div class="leave-message">
    <div class="overlay" @click="emit('close')"></div>

    <ButtonBase class="close" is-normalized @click="emit('close')">
      <IconClose />
    </ButtonBase>

    <Container class="body">
      <FormBase @submit="sendMessage">
        <InputTextarea
          :label="`Message ${useCapitalize(user.name.first)}`"
          name="message"
          placeholder="Leave a message"
          v-model="formData.message"
        />

        <InputCheckbox
          v-model="formData.isAnonymous"
          label="Make it anonymous"
          name="anonymous"
        />

        <template #submit>
          <span>Send {{ useCapitalize(user.name.first) }}</span>
        </template>
      </FormBase>
    </Container>
  </div>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.leave-message {
  z-index: 1001;
  @include grid($center: true);
  @include pos-f(top 0 left 0);
  @include size(100% 100vh);

  .body {
    @include w(100%);
  }

  .close {
    @include size(20px);
    @include pos-a(top 20px right 10px);
  }

  .overlay {
    z-index: -1;
    @include clr-bg(primary, 0.5);
    @include size(100%);
    @include pos-f(top 0 left 0);

    backdrop-filter: blur(8px);
  }
}
</style>
