<script setup lang="ts">
import type { DeleteItem } from "@/types";
import FormActions from "./common/FormActions.vue";

const props = defineProps<{
  open: boolean;
  text: DeleteItem;
}>();
const emits = defineEmits(["confirm", "reject"]);
</script>

<template>
  <v-dialog overlay :model-value="open" max-width="400">
    <v-card class="pa-4">
      <div class="text-center">
        <p class="mt-6 text-xl">
          <template v-if="text">
            {{ text }}
          </template>
          <template v-else> Confirm your action </template>
        </p>
      </div>
      <div class="mt-6 flex justify-center gap-4">
        <FormActions
          ok-btn-label="Confirm"
          @confirm="$emit('confirm')"
          @reject="$emit('reject')"
        />
      </div>
    </v-card>
  </v-dialog>
</template>
