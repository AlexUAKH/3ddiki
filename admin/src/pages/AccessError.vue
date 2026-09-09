<script lang="ts" setup>
import { ERouteNames } from "@/router/router.types";
</script>

<template>
  <v-container fluid fill-height class="pa-0 account-container">
    <div class="access-denied-page">
      <h3>You don't have permissions</h3>
      <v-btn link :to="{ name: ERouteNames.homePage }">Go to home page</v-btn>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.access-denied-page {
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    font-size: 40px;
    margin-bottom: 20px;
  }
}
</style>
