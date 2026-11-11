<script setup lang="ts">
import type { TableAction } from "@/composables/table";
import { useDisplay } from "vuetify";

interface Props {
  actions: TableAction[];
  loading?: string;
  disabled?: { [K: string]: boolean };
}

withDefaults(defineProps<Props>(), {});

const { mobile, mdAndDown } = useDisplay();
</script>

<template>
  <v-menu v-if="mdAndDown">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props" size="small">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(button, idx) in actions" :key="button.label + idx">
        <v-btn
          :prepend-icon="button.icon"
          :text="button.label"
          :color="button.color"
          block
          @click="$emit(button.action)"
        />
      </v-list-item>
    </v-list>
  </v-menu>

  <div v-else class="d-flex align-center ga-4">
    <div
      v-for="(button, idx) in actions"
      class="pa-1"
      :key="button.label + idx"
    >
      <v-btn
        :prepend-icon="button.icon"
        variant="flat"
        :text="button.label"
        :color="button.color"
        :loading="button.action == loading"
        :disabled="
          button.action == loading ||
          (disabled ? disabled[button.action] : false)
        "
        @click="$emit(button.action)"
      />
    </div>
  </div>
</template>

<style scoped></style>
