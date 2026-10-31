<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import BrandManageModal from "@/components/settings/BrandManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import {
  useFilamentBrands,
  type FilamentBrandsType,
} from "@/composables/filamentBrands";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { FILAMENT_BRANDS_API } from "@/constants/api-const";
import {
  DELETE_ICON,
  EDIT_ICON,
  FILAMENT_BRANDS_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingBrand = ref<DeleteItem | null>(null);

const { t } = useI18n();
const router = useRouter();

const { brands, loading, getBrands } = useFilamentBrands();
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
    name: ERouteNames.filamentBrands,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeCategoryHandler = () => {
  getBrands();
  closeManageModal();
};

const closeManageModal = () => {
  router.replace({
    name: ERouteNames.filamentBrands,
    query: {},
  });
  showManageModal.value = false;
};

const deleteBrand = (type: FilamentBrandsType) => {
  deletingBrand.value = { id: type.id, name: type.name };
};

const deleteSuccessHandler = () => {
  deletingBrand.value = null;
  getBrands();
};

onMounted(async () => {
  loading.value = true;
  await getBrands().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div>
    <PageHeader
      :header="t('productCategories.header')"
      :icon="FILAMENT_BRANDS_ICON"
    >
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
          :items="brands"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
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

    <BrandManageModal
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
