<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface CardProps {
  hiddenCloseBtn?: boolean;
}

defineProps<CardProps>();
defineEmits(["close"]);
</script>

<template>
  <div
    @click.stop
    :class="twMerge('relative w-full bg-app border rounded-xl p-4')"
  >
    <div
      v-if="!hiddenCloseBtn"
      class="absolute top-2 right-2"
      @click.stop="$emit('close')"
    >
      <Icon name="mdi:close" class="size-8 cursor-pointer" />
    </div>
    <slot />
  </div>
</template>
