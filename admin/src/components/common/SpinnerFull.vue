<script setup lang="ts">
defineProps({
  show: Boolean,
});
</script>

<template>
  <v-overlay
    :model-value="show"
    content-class="flex h-full w-full items-center justify-center"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
