<script setup lang="ts">
interface BadgeProps {
  count?: number | string | undefined;
}

withDefaults(defineProps<BadgeProps>(), {
  count: 0,
});
</script>

<template>
  <div class="relative">
    <slot />
    <div
      v-if="count"
      class="absolute -top-2 -right-3 py-1 px-2 text-sm font-black rounded-full bg-primary text-white flex justify-center items-center"
    >
      <div class="leading-none">
        {{ count }}
      </div>
    </div>
  </div>
</template>
