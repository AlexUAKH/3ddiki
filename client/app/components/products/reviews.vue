<script setup lang="ts">
import type { Review } from "~/types";

interface ReviewsProps {
  reviews: Review[];
}

defineProps<ReviewsProps>();
</script>

<template>
  <div>
    <div v-if="reviews.length === 0" class="text-center text-gray-500">
      No reviews yet.
    </div>
    <div v-else>
      <div v-for="review in reviews" :key="review.id" class="py-4">
        <div class="flex items-center gap-4">
          <h3 class="font-semibold">{{ review.user }}</h3>
          <span class="text-sm text-gray-500">{{ review.date }}</span>
          <div class="">{{ review.rate }}</div>
        </div>
        <p class="mt-2">{{ review.text }}</p>
      </div>
    </div>
  </div>
</template>
