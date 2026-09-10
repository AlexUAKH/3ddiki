<script setup lang="ts">
import TheHeader from "@/components/layout/TheHeader.vue";
import TheSideBar from "@/components/layout/TheSideBar.vue";
import { useLifecycleLogger } from "@/composables/logger";
import { ref } from "vue";

useLifecycleLogger({ name: "Default layout" });
const isOpen = ref(false);
// const authStore = useAuthStore();
</script>

<template>
  <v-card>
    <v-app>
      <TheHeader @handle-drawer="isOpen = !isOpen" />
      <TheSideBar :isOpen="isOpen" @toggle="isOpen = $event" />

      <v-main style="min-height: 300px" app>
        <slot />
        <!-- <ScrollToTopBtn /> -->
      </v-main>
    </v-app>
  </v-card>
</template>
