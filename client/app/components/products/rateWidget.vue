<script setup lang="ts">
import vue3starRatings from "vue3-star-ratings";

interface RateProps {
  rate: number;
  rateCount?: number;
  starSize?: number;
  starColor?: string;
  inactiveColor?: string;
}

const props = defineProps<RateProps>();
const emits = defineEmits(["change"]);

const rating = computed({
  get() {
    return 3.5; //props.rate;
  },
  set(val) {
    emits("change", val);
  },
});
</script>

<template>
  <!-- <client-only> -->
  <div class="flex gap-2 items-center">
    <vue3starRatings
      v-model="rating"
      :starSize="starSize"
      :starColor="starColor"
      :inactiveColor="inactiveColor"
    />
    <div class="" :style="{ fontSize: (starSize || 16) + 'px' }">
      {{ rate }}
    </div>
  </div>
  <!-- </client-only> -->
</template>
