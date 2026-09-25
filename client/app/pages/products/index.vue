<script setup lang="ts">
interface IndexProps {}

defineProps<IndexProps>();
</script>

<template>
  <AppContainer class="pt-4">
    <ProductsFilters />
    <ProductsList />
  </AppContainer>
</template>
