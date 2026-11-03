<script setup lang="ts">
import { VMarkdownView } from "vue3-markdown";
import "vue3-markdown/dist/vue3-markdown.css";

defineProps<{
  mode: string;
  content: string;
}>();
</script>

<template>
  <VMarkdownView :mode="mode" :content="content" />
</template>

<style scoped>
.markdown-body {
  background-color: transparent;
}
</style>
