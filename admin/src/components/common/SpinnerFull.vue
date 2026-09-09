<script setup lang="ts">
defineProps({
  show: Boolean,
});
</script>

<template>
  <v-overlay :model-value="show" class="align-center justify-center">
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
