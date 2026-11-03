<script setup lang="ts">
defineProps({
  show: Boolean,
});
</script>

<template>
  <v-overlay
    :model-value="show"
    scrim
    :opacity="0.6"
    content-class="d-flex h-screen w-100 align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
