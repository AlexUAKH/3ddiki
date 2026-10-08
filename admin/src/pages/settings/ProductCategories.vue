<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import ProductCategoryModal from "@/components/settings/ProductCategoryModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import {
  useProductCategories,
  type ProductCategoryType,
} from "@/composables/productCategories";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { PRODUCT_CATEGORY_API } from "@/constants/api-const";
import {
  DELETE_ICON,
  EDIT_ICON,
  PRODUCT_CATEGORIES_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingCategory = ref<DeleteItem | null>(null);

const { t } = useI18n();
const router = useRouter();

const { categories, loading, getCategories } = useProductCategories();
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
    key: "title",
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
    name: ERouteNames.productCategories,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeCategoryHandler = () => {
  getCategories();
  closeManageModal();
};

const closeManageModal = () => {
  router.replace({
    name: ERouteNames.productCategories,
    query: {},
  });
  showManageModal.value = false;
};

const deleteType = (type: ProductCategoryType) => {
  deletingCategory.value = { id: type.id, name: type.name };
};

const deleteSuccessHandler = () => {
  deletingCategory.value = null;
  getCategories();
};

onMounted(async () => {
  loading.value = true;
  await getCategories().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div>
    <PageHeader
      :header="t('productCategories.header')"
      :icon="PRODUCT_CATEGORIES_ICON"
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
          :items="categories"
          :loading="loading"
          hide-default-footer
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

    <ProductCategoryModal
      v-if="showManageModal"
      :open="showManageModal"
      :id="editingId"
      @change="changeCategoryHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingCategory"
      :open="!!deletingCategory"
      :item="deletingCategory"
      :url="PRODUCT_CATEGORY_API"
      @success="deleteSuccessHandler"
      @reject="deletingCategory = null"
    />
  </div>
</template>

<style scoped></style>
