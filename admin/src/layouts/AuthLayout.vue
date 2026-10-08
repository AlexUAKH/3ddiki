<script setup lang="ts">
import { useLifecycleLogger } from "@/composables/logger";

useLifecycleLogger({ name: "Auth layout" });
</script>

<template>
  <v-card>
    <v-app>
      <v-main
        class="h-screen d-flex justify-center items-center"
        style="min-height: 300px"
      >
        <slot />
      </v-main>
    </v-app>
  </v-card>
</template>
