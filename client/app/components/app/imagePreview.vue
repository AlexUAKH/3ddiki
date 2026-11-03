<script setup lang="ts">
import type { MediaFile } from "~/types";

interface ImagePreviewProps {
  images: MediaFile[];
  previewImageInd?: number;
}

const props = defineProps<ImagePreviewProps>();
const emits = defineEmits(["close"]);

const currentSlide = ref(0);

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
};

watchEffect(() => {
  if (props.previewImageInd !== undefined)
    currentSlide.value = props.previewImageInd;
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    event.preventDefault();
    emits("close");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <AppOverlay class="bg-black">
    <div class="flex h-full justify-center items-center">
      <Icon
        name="mdi:close"
        :size="40"
        class="absolute z-10 right-4 top-4 cursor-pointer"
        @click="$emit('close')"
      />
      <NuxtImg
        v-if="images.length === 1 && images[0]"
        :src="images[0].path"
        alt="preview"
        class="w-full max-w-[80%] h-full max-h-full object-contain"
        placeholder="/img/loading_img1.gif"
      />
      <AppCarousel v-else v-bind="carouselConfig" v-model="currentSlide" loop>
        <AppSlide v-for="(img, ind) in images" :key="ind">
          <NuxtImg
            :src="img.path"
            alt=""
            class="w-full h-full max-w-[80%] max-h-full object-contain"
            placeholder="/img/loading_img1.gif"
          />
        </AppSlide>

        <template #addons>
          <AppNavigation />
          <AppPagination />
        </template>
      </AppCarousel>
      <!-- <v-carousel
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
    </v-carousel> -->
    </div>
  </AppOverlay>
</template>
