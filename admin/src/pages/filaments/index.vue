<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import ManageModal from "@/components/filament/ManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import { useFilaments, type FilamentType } from "@/composables/filaments";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { FILAMENT_BRANDS_API } from "@/constants/api-const";
import { DELETE_ICON, EDIT_ICON, FILAMENTS_ICON } from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingBrand = ref<DeleteItem | null>(null);

const { t } = useI18n();
const router = useRouter();

const { filaments, loading, getFilaments } = useFilaments();
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
    title: t("common.type"),
    key: "type",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.brand"),
    key: "brand",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.color", 2),
    key: "colors",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.price")}, ${t("common.uah")}/${t("common.kg")}`,
    key: "price",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.stock")}, ${t("common.g")}`,
    key: "stock",
    align: "center",
    sortable: false,
  },
  {
    title: "", //t("common.action", 2),
    key: "actions",
    align: "center",
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
    name: ERouteNames.filaments,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeCategoryHandler = () => {
  getFilaments();
  closeManageModal();
};

const closeManageModal = () => {
  router.replace({
    name: ERouteNames.filaments,
    query: {},
  });
  showManageModal.value = false;
};

const deleteBrand = (type: FilamentType) => {
  deletingBrand.value = { id: type.id, name: type.name };
};

const deleteSuccessHandler = () => {
  deletingBrand.value = null;
  getFilaments();
};

onMounted(async () => {
  loading.value = true;
  await getFilaments().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div>
    <PageHeader :header="t('filaments.header')" :icon="FILAMENTS_ICON">
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
          :items="filaments"
          :loading="loading"
          hide-default-footer
          :no-data-text="t('common.noData')"
        >
          <template #item.colors="{ item }">
            <div
              class="d-flex justify-center align-center ga-2 flex-row flex-wrap"
            >
              <div
                v-for="color in item.colors"
                :key="color"
                :style="{ backgroundColor: color }"
                style="width: 20px; height: 20px; border-radius: 50%"
              ></div>
            </div>
          </template>
          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              @delete="deleteBrand(item)"
              @edit="editHandler(item.id)"
            />
          </template>
        </v-data-table>
      </v-card>
    </div>

    <ManageModal
      v-if="showManageModal"
      :open="showManageModal"
      :id="editingId"
      @change="changeCategoryHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingBrand"
      :open="!!deletingBrand"
      :item="deletingBrand"
      :url="FILAMENT_BRANDS_API"
      @success="deleteSuccessHandler"
      @reject="deletingBrand = null"
    />
  </div>
</template>

<style scoped></style>
