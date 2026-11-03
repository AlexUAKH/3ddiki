<script setup lang="ts">
import type { MediaFile, ProductListItem } from "~/types";

interface CardProps {
  product: ProductListItem;
}

defineProps<CardProps>();
defineEmits(["select"]);

const previewImage = ref<{ images: MediaFile[]; ind: number } | null>(null);

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
};

const setPreviewConfig = (images: MediaFile[], ind: number) => {
  previewImage.value = {
    images,
    ind,
  };
};
</script>

<template>
  <AppCard
    hiddenCloseBtn
    class="pl-0 pr-0 pb-0 cursor-pointer flex flex-col overflow-hidden"
  >
    <div
      v-if="product.discount"
      class="absolute z-10 top-3 right-2 text-2xl font-bold bg-primary px-5 py-2 rounded-lg"
    >
      {{ product.discount }}%
    </div>

    <div
      class="leading-0 pb-[80%] block w-full relative overflow-hidden text-center"
    >
      <div
        class="flex items-center justify-center absolute overflow-hidden left-0 right-0 bottom-0 top-0"
      >
        <NuxtImg
          v-if="product.images.length == 1 && product.images[0]"
          :src="product.images[0].path"
          alt=""
          class="w-full h-full max-h-full max-w-full object-contain align-middle border-none"
          placeholder="/img/loading_img1.gif"
          @click="setPreviewConfig(product.images, 0)"
        />
        <AppCarousel v-else v-bind="carouselConfig" loop>
          <AppSlide
            v-for="(img, ind) in product.images"
            :key="ind"
            @click="setPreviewConfig(product.images, ind)"
          >
            <NuxtImg
              :src="img.path"
              alt=""
              class="w-full h-full max-h-80 md:max-h-112.5 max-w-full object-cover"
              placeholder="/img/loading_img1.gif"
            />
          </AppSlide>

          <template #addons>
            <AppNavigation />
            <AppPagination />
          </template>
        </AppCarousel>
      </div>
    </div>

    <div class="p-4 pt-8 mt-auto" @click="$emit('select')">
      <div class="font-serif text-3xl font-bold">{{ product.name }}</div>
      <div class="mt-2 text-gray-400">{{ product.category }}</div>
      <div class="flex mt-4 justify-between">
        <ProductsRateWidget :rate="product.rate" :rate-count="1" />
        <ProductsPriceWidget
          :price="product.price"
          :discount="product.discount"
        />
      </div>
    </div>

    <Teleport to="#teleports">
      <AppImagePreview
        v-if="previewImage"
        :images="previewImage.images"
        :preview-image-ind="previewImage.ind"
        @close="previewImage = null"
      />
    </Teleport>
  </AppCard>
</template>
