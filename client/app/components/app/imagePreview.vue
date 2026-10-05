<script setup lang="ts">
import type { MediaFile } from "~/types";

interface ImagePreviewProps {
  image: MediaFile;
}

defineProps<ImagePreviewProps>();
defineEmits(["close"]);
</script>

<template>
  <AppOverlay class="bg-black" @click="$emit('close')">
    <div class="flex h-full justify-center items-center">
      <div class="max-w-3xl">
        <img
          :src="image.url"
          alt="preview"
          class="w-full h-auto object-contain"
        />
      </div>
    </div>
  </AppOverlay>
</template>
