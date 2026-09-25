<script setup lang="ts">
interface FiltersProps {}

defineProps<FiltersProps>();
</script>

<template>
  <div class="flex justify-end items-center gap-4">
    <div class="">filter: category</div>
    <div class="">sort: price up</div>
    <div class="">find: by name</div>
  </div>
</template>
