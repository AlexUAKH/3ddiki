<script lang="ts" setup>
import "vue3-carousel/carousel.css";
import { useAppStore } from "./stores/app";

useSeoMeta({
  title: "3Ddiki",
  ogTitle: "3Ddiki",
  description: "3D printed toys and accessorizes.",
  ogDescription: "3D printed toys and accessorizes.",
  // ogImage: 'https://example.com/image.png',
  twitterCard: "summary_large_image",
});

const { showAuth } = storeToRefs(useAppStore());
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="grow pb-10 pt-4 md:pt-8 relative z-0">
      <NuxtLayout>
        <NuxtPage
          :transition="{
            name: 'my',
            mode: 'out-in',
          }"
        />
      </NuxtLayout>
    </main>
    <AppFooter />

    <Teleport v-if="showAuth" to="#teleports">
      <AuthBase />
    </Teleport>
  </div>
</template>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
/* .page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem); 
}*/
</style>
