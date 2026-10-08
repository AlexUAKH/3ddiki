<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import PercentManageModal from "@/components/product/PercentManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useProducts, type ProductListItem } from "@/composables/products";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { PRODUCT_API } from "@/constants/api-const";
import {
  DELETE_ICON,
  EDIT_ICON,
  PERCENT_ICON,
  PRODUCTS_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingProduct = ref<DeleteItem | null>(null);
const changeDiscountProduct = ref<ProductListItem | null>(null);

const { t } = useI18n();
const { products, loading, getProducts } = useProducts();
const router = useRouter();

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
    title: t("common.category"),
    key: "category",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.weight")}, ${t("common.g")}`,
    key: "weight",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.discount") + " %",
    key: "discount",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.sizeX")}, ${t("common.sm")}`,
    key: "sizeX",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.sizeY")}, ${t("common.sm")}`,
    key: "sizeY",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.sizeZ")}, ${t("common.sm")}`,
    key: "sizeZ",
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
    action: EActions.changeDiscount,
    icon: PERCENT_ICON,
    label: t("common.discount"),
    color: "secondary",
  },
  {
    action: EActions.delete,
    icon: DELETE_ICON,
    label: t("common.delete"),
    color: "error",
  },
]);

const createHandler = () => {
  router.push({ name: ERouteNames.productsCreate });
};

const editHandler = (id: number) => {
  router.push({ name: ERouteNames.productsEdit, params: { id } });
};

const deleteProduct = (product: ProductListItem) => {
  deletingProduct.value = { id: product.id, name: product.name };
};

const deleteSuccessHandler = () => {
  deletingProduct.value = null;
  getProducts();
};

onMounted(async () => {
  loading.value = true;
  await getProducts().finally(() => {
    loading.value = false;
  });
});

const changeDiscount = (item: ProductListItem) => {
  changeDiscountProduct.value = item;
};
const changeProductDiscountHandler = () => {
  changeDiscountProduct.value = null;
  getProducts();
};
</script>

<template>
  <div>
    <PageHeader :header="t('products.header')" :icon="PRODUCTS_ICON">
      <template #actions>
        <v-btn color="info" @click="createHandler">
          {{ t("common.create") }}
        </v-btn>
      </template>
    </PageHeader>

    <div class="mt-4">
      <v-card variant="outlined">
        <v-data-table
          striped="even"
          :headers="headers"
          :items="products"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
          <template #item.category="{ item }">
            {{ item.category?.title || "" }}
          </template>
          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              @delete="deleteProduct(item)"
              @edit="editHandler(item.id)"
              @changeDiscount="changeDiscount(item)"
            />
          </template>
        </v-data-table>
      </v-card>
    </div>

    <PercentManageModal
      v-if="changeDiscountProduct"
      :id="changeDiscountProduct.id"
      :open="!!changeDiscountProduct"
      :current-percent="changeDiscountProduct.discount"
      @change="changeProductDiscountHandler"
      @close="changeDiscountProduct = null"
    />
    <!-- <ManageModal
      v-if="showManageModal"
      :open="showManageModal"
      :id="editingId"
      @change="changeProductHandler"
      @close="closeManageModal"
    /> -->

    <DeleteItemModal
      v-if="deletingProduct"
      :open="!!deletingProduct"
      :item="deletingProduct"
      :url="PRODUCT_API"
      @success="deleteSuccessHandler"
      @reject="deletingProduct = null"
    />
  </div>
</template>

<style scoped></style>
