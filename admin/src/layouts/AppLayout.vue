<script setup lang="ts">
import { useLifecycleLogger } from "@/composables/logger";
// import Vue from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

useLifecycleLogger({ name: "App layout" });
</script>

<template>
  <Component :is="route.meta.layoutComponent">
    <slot />
  </Component>
</template>

<style scoped></style>
