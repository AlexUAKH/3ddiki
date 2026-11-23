<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("user.order", 2),
});
</script>

<template>
  <div class="md:mt-6 p-4">
    <AppPageHeader class="mb-5">
      {{ t("user.order", 2) }}
    </AppPageHeader>
  </div>
</template>
