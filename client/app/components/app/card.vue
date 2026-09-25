<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface CardProps {}

defineProps<CardProps>();
</script>

<template>
  <div
    @click.stop
    :class="twMerge('relative w-full bg-app max-w-lg border rounded-xl p-4')"
  >
    <slot />
  </div>
</template>
