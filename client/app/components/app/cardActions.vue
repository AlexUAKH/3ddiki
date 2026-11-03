<script setup lang="ts">
type Align = "start" | "center" | "end";

interface CardActionsProps {
  okText?: string;
  cancelText?: string;
  hideCancelBtn?: boolean;
  justify?: Align;
  disabled?: boolean;
  processing?: boolean;
}

withDefaults(defineProps<CardActionsProps>(), {
  okText: "common.ok",
  cancelText: "common.cancel",
  hideCancelBtn: false,
  justify: "end",
  disabled: false,
});
defineEmits(["confirm", "cancel"]);

const { t } = useI18n();
</script>

<template>
  <div
    class="mt-2 flex gap-4"
    :class="{
      'justify-start': justify === 'start',
      'justify-center': justify === 'center',
      'justify-end': justify === 'end',
    }"
  >
    <AppButton
      class="text-green-800 border-green-800 dark:text-green-400 dark:border-green-400 border rounded-xl"
      :disabled="disabled"
      :processing="processing"
      @click="$emit('confirm')"
      >{{ t(okText) }}</AppButton
    >
    <AppButton
      v-if="!hideCancelBtn"
      class="text-red-600 border border-red-600 dark:text-red-200 dark:border-red-200 rounded-xl"
      :disabled="disabled || processing"
      @click="$emit('cancel')"
      >{{ t(cancelText) }}</AppButton
    >
  </div>
</template>
