<script setup lang="ts">
import { marked } from "marked";
import DOMPurify from "dompurify";

const parsedContent = ref("");

const { content } = withDefaults(
  defineProps<{ tag?: string; content: string }>(),
  {
    tag: "div",
  }
);

onMounted(() => {
  parsedContent.value = marked.parse(content);
  parsedContent.value = DOMPurify.sanitize(parsedContent.value);
});
</script>

<template>
  <transition name="fade" mode="out-in">
    <Component
      :is="tag"
      v-if="parsedContent"
      v-html="parsedContent"
      class="content"
    ></Component>
    <Spinner v-else />
  </transition>
</template>

<style scoped lang="scss">
@use "~~/assets/styles/mixins" as *;

.content {
  @include break-word;

  ::v-deep {
    :is(h1, h2, h3, h4, h5, h6, p, pre, blockquote, q):not(:last-child) {
      @include mb(5px);
    }

    ul,
    ol {
      @include pl(20px);
    }

    hr {
      @include my(10px);
    }

    img {
      @include w(max 100%);
      object-fit: cover;
    }

    p code {
      @include clr-bg;
      @include pa(2px 3px);
      @include ma(-2px -3px);
      @include br-sm;
    }
    pre {
      @include clr-bg;
      @include pa(10px 20px);
      @include br-sm;
    }
  }
}
</style>
