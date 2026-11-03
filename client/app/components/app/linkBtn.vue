<script setup lang="ts">
interface LinkBtnProps {
  active?: boolean;
}

defineProps<LinkBtnProps>();
</script>

<template>
  <NuxtLink
    class="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-300/40 dark:hover:bg-gray-600 cursor-pointer"
    :class="{ 'bg-gray-300 dark:bg-gray-800': active }"
  >
    <slot />
  </NuxtLink>
</template>
