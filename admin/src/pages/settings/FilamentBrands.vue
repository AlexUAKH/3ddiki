<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import type { Header } from "@/composables/table";
import { FILAMENT_BRANDS_ICON } from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const headers: Header[] = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Address",
    key: "address",
    sortable: false,
  },
  {
    title: "Email",
    key: "companyRepresentatives",
    sortable: false,
  },

  {
    title: "Lead Type",
    key: "type",
    width: 140,
    // align: "center"
  },
  {
    title: "Actions",
    key: "id",
    sortable: false,
    width: 140,
    // align: "center"
  },
];
</script>

<template>
  <div class="">
    <PageHeader
      :header="t('filamentBrands.header')"
      :icon="FILAMENT_BRANDS_ICON"
    />
    <h3>filament-brands works</h3>
    <!-- <Table :headers="headers"  /> -->
  </div>
</template>

<style scoped></style>
