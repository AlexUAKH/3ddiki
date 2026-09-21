<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import {
  PRODUCT_CATEGORIES_ICON
} from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <PageHeader
      :header="t('productCategories.header')"
      :icon="PRODUCT_CATEGORIES_ICON"
    />
    <h3>product-categories works</h3>
  </div>
</template>

<style scoped></style>
