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
  <div class="d-flex justify-end align-center ga-4 capitalize">
    <v-btn
      density="compact"
      color="success"
      :disabled="processing"
      :loading="processing"
      @click="$emit('confirm')"
    >
      {{ okBtnLabel }}
    </v-btn>

    <v-btn
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
