<script setup lang="ts">
const colorMode = useColorMode();

const setMode = (mode: "dark" | "light") => {
  colorMode.preference = mode;
};
</script>

<template>
  <AppButton
    @click="setMode(colorMode.preference === 'dark' ? 'light' : 'dark')"
  >
    <Icon
      class="size-6 md:size-8"
      :name="
        colorMode.preference === 'dark'
          ? 'mdi:white-balance-sunny'
          : 'mdi:weather-night'
      "
    />
  </AppButton>
</template>
