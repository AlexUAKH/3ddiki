<script setup lang="ts">
import type { TableAction } from "@/composables/table";
import { useDisplay } from "vuetify";

interface Props {
  actions: TableAction[];
}

withDefaults(defineProps<Props>(), {});

const { mobile, mdAndDown } = useDisplay();
</script>

<template>
  <v-menu v-if="mobile">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props" size="small">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(button, idx) in actions" :key="button.label + idx">
        <v-btn
          :prepend-icon="button.icon"
          :text="button.label"
          :color="button.color"
          @click="$emit(button.action)"
        />
      </v-list-item>
    </v-list>
  </v-menu>

  <div class="flex items-center gap-4">
    <div
      v-for="(button, idx) in actions"
      class="pa-1"
      :key="button.label + idx"
    >
      <v-btn
        :prepend-icon="button.icon"
        :text="button.label"
        :color="button.color"
        @click="$emit(button.action)"
      />
    </div>
  </div>
</template>

<style scoped></style>
