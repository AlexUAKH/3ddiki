<script lang="ts" setup>
useSeoMeta({
  title: "3Ddiki",
  ogTitle: "3Ddiki",
  description: "3D printed toys and accessorizes.",
  ogDescription: "3D printed toys and accessorizes.",
  // ogImage: 'https://example.com/image.png',
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <NuxtRouteAnnouncer />
    <TheHeader />
    <main class="grow">
      <NuxtPage />
    </main>
    <TheFooter />

    <Teleport to="#teleports">
      <Login />
    </Teleport>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
