<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import { CUSTOMERS_ICON } from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <PageHeader :header="t('customers.header')" :icon="CUSTOMERS_ICON" />
    <h3>Customer index works</h3>
  </div>
</template>

<style scoped></style>
