<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import { FILAMENTS_ICON } from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <PageHeader :header="t('filaments.header')" :icon="FILAMENTS_ICON" />
    <h3>Filaments index works</h3>
  </div>
</template>

<style scoped></style>
