<script setup lang="ts">
interface BackProps {
  text?: string;
}

withDefaults(defineProps<BackProps>(), {
  text: "common.back",
});

const { t } = useI18n();
</script>

<template>
  <AppButton class="flex items-center">
    <Icon name="mdi:arrow-left-bold" />
    {{ t(text) }}
  </AppButton>
</template>
