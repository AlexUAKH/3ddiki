<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const props = defineProps<{ class?: string }>();
</script>

<template>
  <div :class="twMerge('fixed inset-0 bg-black/70 p-4', props.class)">
    <slot />
  </div>
</template>
