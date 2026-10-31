<script setup lang="ts">
import type { ProductListItem } from "~/types";

interface CardProps {
  product: ProductListItem;
}

defineProps<CardProps>();
defineEmits(["select"]);

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
};
</script>

<template>
  <AppCard
    hiddenCloseBtn
    class="pl-0 pr-0 pt-0 pb-0 cursor-pointer flex flex-col"
  >
    <div
      v-if="product.discount"
      class="absolute z-10 top-3 right-2 text-2xl font-bold bg-primary px-5 py-2 rounded-lg"
    >
      {{ product.discount }}%
    </div>
    <div class="rounded-t-xl overflow-hidden">
      <NuxtImg
        v-if="product.images.length == 1 && product.images[0]"
        :src="product.images[0].path"
        alt=""
        class="w-full h-full max-h-80 md:max-h-112.5 max-w-full object-cover"
        placeholder="/img/loading_img1.gif"
      />
      <AppCarousel v-else v-bind="carouselConfig" loop>
        <AppSlide v-for="(img, ind) in product.images" :key="ind" @click="">
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

    <div class="p-4 pt-8 mt-auto" @click="$emit('select')">
      <div class="font-serif text-3xl font-bold">{{ product.name }}</div>
      <div class="mt-2 text-gray-400">{{ product.category }}</div>
      <div class="flex mt-4 mr-6 justify-between">
        <ProductsRateWidget :rate="product.rate" :rate-count="1" />
        <ProductsPriceWidget
          :price="product.price"
          :discount="product.discount"
        />
      </div>
    </div>
  </AppCard>
</template>
