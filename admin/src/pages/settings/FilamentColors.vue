<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import {
  FILAMENT_COLORS_ICON
} from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <PageHeader
      :header="t('filamentColors.header')"
      :icon="FILAMENT_COLORS_ICON"
    />
    <h3>filament-colors works</h3>
  </div>
</template>

<style scoped></style>
