<script setup lang="ts">
const productsCount = ref(10);
</script>

<template>
  <AppBadge :count="productsCount">
    <AppButton>
      <Icon
        v-if="productsCount > 0"
        name="mdi:cart-variant"
        class="size-6 md:size-8"
      />
      <Icon v-else name="mdi:cart-outline" class="size-6 md:size-8" />
    </AppButton>
  </AppBadge>
</template>
