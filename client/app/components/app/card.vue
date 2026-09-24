<script setup lang="ts">
interface CardProps {}

defineProps<CardProps>();
</script>

<template>
  <div
    @click.stop
    class="relative w-full bg-app max-w-lg border rounded-xl p-4"
  >
    <slot />
  </div>
</template>
