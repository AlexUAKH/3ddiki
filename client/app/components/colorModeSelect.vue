<script setup lang="ts">
const colorMode = useColorMode();

const setMode = (mode: "dark" | "light") => {
  colorMode.preference = mode;
};
</script>

<template>
  <div class="">
    <Icon
      v-if="colorMode.preference === 'dark'"
      class="size-6 md:size-8"
      name="mdi:white-balance-sunny"
      @click="setMode('light')"
    />
    <Icon
      v-if="colorMode.preference === 'light'"
      class="size-6 md:size-8"
      name="mdi:weather-night"
      @click="setMode('dark')"
    />
  </div>
</template>
