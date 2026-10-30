<script setup lang="ts">
import type { ImageType } from "@/composables/products";

interface ImagePreviewProps {
  images: ImageType[];
}

defineProps<ImagePreviewProps>();

defineEmits(["close"]);
</script>

<template>
  <v-dialog
    :model-value="!!images?.length"
    fullscreen
    scrim
    :opacity="1"
    class="relative"
  >
    <v-btn class="close" icon="mdi-close" @click="$emit('close')"></v-btn>
    <v-img v-if="images.length === 1" :src="images[0].path" />
    <v-carousel
      v-else
      height="100%"
      hide-delimiter-background
      show-arrows="hover"
      cycle
      hide-delimiters
      progress
    >
      <v-carousel-item
        v-for="image in images"
        :src="image.path"
      ></v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>

<style>
.close {
  position: absolute;
  z-index: 100;
  top: 20px;
  right: 20px;
}
</style>
