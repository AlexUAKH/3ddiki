<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import ManageModal from "@/components/order/ManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import { useOrders, type OrderListItem } from "@/composables/orders";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { ORDER_API } from "@/constants/api-const";
import { DELETE_ICON, EDIT_ICON, ORDERS_ICON } from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingOrder = ref<DeleteItem | null>(null);

const { t } = useI18n();
const { orders, loading, getOrders } = useOrders();
const router = useRouter();
const { editingId, showManageModal } = useEditModal();

const headers = computed<Header[]>(() => [
  {
    title: "ID",
    key: "id",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.user"),
    key: "user",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.status"),
    key: "status",
    align: "center",
    sortable: false,
  },
  {
    title: `${t("common.total")}, ${t("common.uah")}`,
    key: "total",
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

// const createHandler = () => {
//   router.push({ name: ERouteNames.ordersCreate });
// };

const editHandler = (id: number) => {
  router.replace({
    name: ERouteNames.ordersEdit,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeOrderHandler = () => {
  getOrders();
  closeManageModal();
};

const deleteOrder = (product: OrderListItem) => {
  deletingOrder.value = { id: product.id, name: product.user };
};

const deleteSuccessHandler = () => {
  deletingOrder.value = null;
  getOrders();
};

const closeManageModal = () => {
  router.replace({
    name: ERouteNames.orders,
    query: {},
  });
  showManageModal.value = false;
};

onMounted(async () => {
  loading.value = true;
  await getOrders().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div>
    <PageHeader :header="t('orders.header')" :icon="ORDERS_ICON">
      <!-- <template #actions>
        <v-btn color="info" @click="createHandler">
          {{ t("common.create") }}
        </v-btn>
      </template> -->
    </PageHeader>

    <div class="mt-4">
      <v-card variant="outlined">
        <v-data-table
          striped="even"
          :headers="headers"
          :items="orders"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              @delete="deleteOrder(item)"
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
      @change="changeOrderHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingOrder"
      :open="!!deletingOrder"
      :item="deletingOrder"
      :url="ORDER_API"
      @success="deleteSuccessHandler"
      @reject="deletingOrder = null"
    />
  </div>
</template>

<style scoped></style>
