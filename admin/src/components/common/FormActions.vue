<script setup lang="ts">
interface Props {
  okBtnLabel?: string;
  cancelBtnLabel?: string;
  processing?: boolean;
}

withDefaults(defineProps<Props>(), {
  okBtnLabel: "Ok",
  cancelBtnLabel: "Cancel",
  processing: false,
});

defineEmits(["confirm", "reject"]);
</script>

<template>
  <div class="flex justify-end items-center gap-4 capitalize">
    <v-btn
      variant="outlined"
      density="compact"
      color="success"
      :disabled="processing"
      :loading="processing"
      @click="$emit('confirm')"
    >
      {{ okBtnLabel }}
    </v-btn>

    <v-btn
      variant="outlined"
      density="compact"
      color="error"
      :disabled="processing"
      @click="$emit('reject')"
    >
      {{ cancelBtnLabel }}
    </v-btn>
  </div>
</template>

<style scoped></style>
