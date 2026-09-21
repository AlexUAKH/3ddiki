<script setup lang="ts">
import TheFooter from "@/components/layout/TheFooter.vue";
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
        <div class="p-4">
          <slot />
        </div>
        <!-- <ScrollToTopBtn /> -->
      </v-main>
      <TheFooter app />
    </v-app>
  </v-card>
</template>
