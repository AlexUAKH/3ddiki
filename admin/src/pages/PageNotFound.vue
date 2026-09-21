<script lang="ts" setup>
import { ERouteNames } from "@/router/router.types";
import { useI18n } from "vue-i18n";

defineProps({
  canGoHome: { type: Boolean, default: true, required: false },
});

const { t } = useI18n();
</script>

<template>
  <v-container fluid fill-height class="pa-0">
    <div class="not-found-page">
      <h1>404</h1>
      <h3>{{ t("404.pageNotFound") }}</h3>
      <v-btn v-if="canGoHome" link :to="{ name: ERouteNames.homePage }">{{
        t("404.goToHomePage")
      }}</v-btn>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.not-found-page {
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-size: 140px;
    line-height: 100%;
  }

  h3 {
    font-size: 40px;
    margin-bottom: 20px;
  }
}
</style>
