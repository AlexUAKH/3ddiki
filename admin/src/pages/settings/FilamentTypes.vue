<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import TypeManageModal from "@/components/settings/TypeManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import {
  useFilamentTypes,
  type FilamentTypesType,
} from "@/composables/filamentTypes";
import {
  EActions,
  useTable,
  type Header,
  type TableAction,
} from "@/composables/table";
import { FILAMENT_TYPES_API } from "@/constants/api-const";
import {
  DELETE_ICON,
  EDIT_ICON,
  FILAMENT_TYPES_ICON,
} from "@/constants/iconsMap";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const deletingType = ref<DeleteItem | null>(null);

const { t } = useI18n();

const { page, itemsPerPage, total } = useTable();
const { types, loading, getTypes } = useFilamentTypes();
const { editingId, showManageModal } = useEditModal();

const headers = computed<Header[]>(() => [
  {
    title: "ID",
    key: "id",
  },
  {
    title: t("common.nameObj"),
    key: "name",
  },
  {
    title: t("common.action", 2),
    key: "actions",
    sortable: false,
  },
]);

const actions = computed<TableAction[]>(() => [
  {
    action: EActions.edit,
    icon: EDIT_ICON,
    label: t("common.edit"),
    color: "yellow",
  },
  {
    action: EActions.delete,
    icon: DELETE_ICON,
    label: t("common.delete"),
    color: "error",
  },
]);

const createHandler = () => {
  showManageModal.value = true;
};

const changeTypeHandler = () => {
  getTypes();
  closeManageModal();
};

const closeManageModal = () => {
  // router.replace({ name: "settings-filament-types", query: {} });
  showManageModal.value = false;
};

const deleteType = (type: FilamentTypesType) => {
  deletingType.value = { id: type.id, name: type.name };
};

const deleteSuccessHandler = () => {
  deletingType.value = null;
  getTypes();
};

onMounted(async () => {
  loading.value = true;
  await getTypes().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div class="">
    <PageHeader :header="t('filamentTypes.header')" :icon="FILAMENT_TYPES_ICON">
      <template #actions>
        <v-btn color="secondary" variant="flat" @click="createHandler">
          {{ t("common.create") }}
        </v-btn>
      </template>
    </PageHeader>

    <div class="mt-4">
      <v-data-table
        :headers="headers"
        :items="types"
        :loading="loading"
        hide-default-footer
        :no-data-text="t('common.noData')"
      >
        <template #item.actions>
          <TableActions :actions="actions" @delete="deleteType" />
        </template>
      </v-data-table>
    </div>

    <TypeManageModal
      v-if="showManageModal"
      :open="showManageModal"
      :id="editingId"
      @change="changeTypeHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingType"
      :open="!!deletingType"
      :item="deletingType"
      :url="FILAMENT_TYPES_API"
      @success="deleteSuccessHandler"
      @reject="deletingType = null"
    />
  </div>
</template>

<style scoped></style>
