<script setup lang="ts">
interface CardActionsProps {
  okText?: string;
  cancelText?: string;
}

withDefaults(defineProps<CardActionsProps>(), {
  okText: "common.ok",
  cancelText: "common.cancel",
});
defineEmits(["confirm", "cancel"]);

const { t } = useI18n();
</script>

<template>
  <div class="mt-2 flex justify-end gap-4">
    <AppButton
      class="text-green-800 border-green-800 dark:text-green-400 dark:border-green-400 border rounded-xl"
      @click="$emit('confirm')"
      >{{ t(okText) }}</AppButton
    >
    <AppButton
      class="text-red-600 border border-red-600 dark:text-red-200 dark:border-red-200 rounded-xl"
      @click="$emit('cancel')"
      >{{ t(cancelText) }}</AppButton
    >
  </div>
</template>
