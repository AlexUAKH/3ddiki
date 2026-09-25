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

const getPriceWithDiscount = ({ price, discount }: ProductListItem) =>
  price * (1 - discount / 100);
</script>

<template>
  <AppCard class="pl-0 pr-0 pt-0 pb-0 cursor-pointer">
    <div
      v-if="product.discount"
      class="absolute z-10 top-5 right-4 text-xl font-bold bg-primary px-3 rounded-lg"
    >
      {{ product.discount }}%
    </div>
    <div class="rounded-t-xl overflow-hidden">
      <AppCarousel v-bind="carouselConfig" loop>
        <AppSlide v-for="(img, ind) in product.images" :key="ind">
          <img
            :src="img.url"
            alt=""
            class="h-full max-h-80 md:max-h-112.5 max-w-full object-cover"
          />
        </AppSlide>

        <template #addons>
          <Navigation />
          <AppPagination />
        </template>
      </AppCarousel>
    </div>
    <!-- </ClientOnly> -->
    <div class="p-4" @click="$emit('select')">
      <div class="font-serif text-3xl font-bold">{{ product.name }}</div>
      <div class="mt-2 text-gray-400">{{ product.category }}</div>
      <div class="flex mt-4 mr-6 justify-between">
        <ProductsRate :rate="product.rate" />
        <div class="text-xl font-bold">
          <template v-if="product.discount">{{
            getPriceWithDiscount(product)
          }}</template>
          <span
            :class="{
              'ml-2 font-normal text-lg text-gray-400 line-through':
                product.discount,
            }"
            >{{ product.price }}</span
          >
          грн
        </div>
      </div>
    </div>
  </AppCard>
</template>
