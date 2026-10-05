<script setup lang="ts">
import { twMerge } from "tailwind-merge";

interface PriceWidgetProps {
  discount?: number;
  price: number;
  class?: string;
}

const props = defineProps<PriceWidgetProps>();

const getPriceWithDiscount = (price: number, discount: number = 0) =>
  price * (1 - discount / 100);
</script>

<template>
  <div
    :class="twMerge('text-xl font-bold whitespace-nowrap', props.class || '')"
  >
    <template v-if="discount">{{
      getPriceWithDiscount(price, discount)
    }}</template>
    <span
      :class="{
        'ml-2 font-normal text-lg text-gray-400 line-through': discount,
      }"
    >
      {{ price }}
    </span>
    грн
  </div>
</template>
