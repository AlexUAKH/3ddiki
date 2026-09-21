<script setup lang="ts"></script>

<template>
  <v-footer
    app
    class="d-flex align-center justify-center ga-2 flex-wrap grow py-3"
  >
    <!-- <v-btn
      v-for="link in links"
      :key="link"
      :text="link"
      variant="text"
      rounded
    ></v-btn> -->

    <div class="flex-1-0-100 text-center">
      {{ new Date().getFullYear() }} — <strong>3ddiki.inc</strong>
    </div>
  </v-footer>
</template>

<style scoped></style>
