<script setup lang="ts">
interface ReviewsProps {}

defineProps<ReviewsProps>();

const { t } = useI18n();
</script>

<template>
  <AppContainer class="mt-6 p-4 text-lg">
    <h2 class="text-3xl md:text-5xl mb-5">{{ t("reviews.header") }}</h2>
  </AppContainer>
</template>
