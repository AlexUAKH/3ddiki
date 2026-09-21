<script setup lang="ts">
import type { Header, TableAction } from "@/composables/table";
import { computed, getCurrentInstance, type Slots } from "vue";
import { useDisplay } from "vuetify";

interface Props {
  actions?: TableAction[];
  headers: Header[];
  items: any[];
  itemsPerPage?: number;
  totalItems?: number | string;
  loading?: boolean;
  search?: any;
}

withDefaults(defineProps<Props>(), {
  itemsPerPage: 20,
  totalItems: "",
  items: () => [],
  actions: () => [],
});

const { mobile, mdAndDown } = useDisplay();

const { slots } = getCurrentInstance()!;
// Type `$slots` as Record<string, Slot>

const typedSlots = computed(() => {
  return Object.entries(slots) as [string, Slots[string]][];
});
</script>

<template>
  <div class="">
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
    >
      <!-- @update:options="loadItems" -->
      <template #item.actions>
        <v-menu v-if="mobile">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" size="small">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(button, idx) in actions"
              :key="button.label + idx"
            >
              <v-btn
                :prepend-icon="button.icon"
                :text="button.label"
                :color="button.color"
                @click="$emit(button.action)"
              />
            </v-list-item>
          </v-list>
        </v-menu>

        <v-row no-gutters v-else>
          <v-col
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
          </v-col>
        </v-row>
      </template>

      <!-- Iterating over named scoped slots -->
      <template v-for="[slot, _] in typedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope || {}" />
      </template>
    </v-data-table-server>
  </div>
</template>

<style scoped></style>
