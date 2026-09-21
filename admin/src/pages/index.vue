<script lang="ts" setup>
import PageHeader from "@/components/common/PageHeader.vue";
import { DASHBOARD_ICON } from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <PageHeader :header="t('dashboard.header')" :icon="DASHBOARD_ICON" />
    Home screen
  </div>
</template>
