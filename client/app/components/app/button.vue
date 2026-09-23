<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface BtnProps {
  class?: string;
  block?: boolean;
}

const props = defineProps<BtnProps>();
</script>

<template>
  <button
    :class="
      twMerge(
        'flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer',
        props.class,
      )
    "
    :style="[block ? 'width: 100%' : '']"
  >
    <slot />
  </button>
</template>
