<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import TypeManageModal from "@/components/settings/TypeManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import {
  useFilamentTypes,
  type FilamentTypesType,
} from "@/composables/filamentTypes";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { FILAMENT_TYPES_API } from "@/constants/api-const";
import {
  DELETE_ICON,
  EDIT_ICON,
  FILAMENT_TYPES_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingType = ref<DeleteItem | null>(null);

const { t } = useI18n();
const router = useRouter();

const { types, loading, getTypes } = useFilamentTypes();
const { editingId, showManageModal } = useEditModal();

const headers = computed<Header[]>(() => [
  {
    title: "ID",
    key: "id",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.nameObj"),
    key: "name",
    align: "center",
    sortable: false,
  },
  {
    title: "", //t("common.action", 2),
    key: "actions",
    sortable: false,
  },
]);

const actions = computed<TableAction[]>(() => [
  {
    action: EActions.edit,
    icon: EDIT_ICON,
    label: t("common.edit"),
    color: "warning",
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

const editHandler = (id: any) => {
  router.replace({
    name: ERouteNames.filamentTypes,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeTypeHandler = () => {
  getTypes();
  closeManageModal();
};

const closeManageModal = () => {
  router.replace({ name: ERouteNames.filamentTypes, query: {} });
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
  <div>
    <PageHeader :header="t('filamentTypes.header')" :icon="FILAMENT_TYPES_ICON">
      <template #actions>
        <v-btn color="info" @click="createHandler">
          {{ t("common.create") }}
        </v-btn>
      </template>
    </PageHeader>

    <div class="mt-4">
      <v-card variant="outlined">
        <v-data-table
          :headers="headers"
          :items="types"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              @delete="deleteType(item)"
              @edit="editHandler(item.id)"
            />
          </template>
        </v-data-table>
      </v-card>
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
