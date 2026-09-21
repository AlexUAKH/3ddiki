<script setup lang="ts">
import { ref } from "vue";

interface Props {
  cancelText?: string;
  yesText?: string;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  cancelText: "Cancel",
  yesText: "Confirm",
  text: "Do you confirm this action?",
});

const dialog = ref(false);
const confirmResolve = ref<any>();

const confirm = (): Promise<boolean> => {
  return new Promise((res) => {
    dialog.value = true;
    confirmResolve.value = res;
  });
};

const setConfirm = (value: boolean) => {
  confirmResolve.value(value);
  dialog.value = false;
};

defineExpose({ confirm });
</script>

<template>
  <v-dialog :model-value="dialog" width="auto" persistent>
    <v-card class="px-8 py-4 text-center">
      <v-card-text>
        <div>{{ text }}</div>
      </v-card-text>

      <div class="flex justify-end gap-2 mt-4">
        <v-btn @click="setConfirm(false)">{{ cancelText }}</v-btn>

        <v-btn color="error" variant="outlined" @click="setConfirm(true)">{{
          yesText
        }}</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>
