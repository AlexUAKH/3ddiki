<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import { PRODUCTS_ICON } from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <PageHeader :header="t('products.header')" :icon="PRODUCTS_ICON" />
    <h3>Products index works</h3>
  </div>
</template>

<style scoped></style>
