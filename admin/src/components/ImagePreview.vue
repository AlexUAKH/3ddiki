<script setup lang="ts">
import type { ImageType } from "@/composables/products";
import { ref, watchEffect } from "vue";

interface ImagePreviewProps {
  images: ImageType[];
  previewImageInd?: number;
}

const props = defineProps<ImagePreviewProps>();
defineEmits(["close"]);

const currentSlide = ref(0);

watchEffect(() => {
  if (props.previewImageInd !== undefined)
    currentSlide.value = props.previewImageInd;
});
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
      v-model="currentSlide"
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
