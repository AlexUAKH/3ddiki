<script setup lang="ts">
import { useEditModal } from "@/composables/editModal.ts";
import { useProducts, type ProductVariant } from "@/composables/products";
import {
  EActions,
  type Header,
  type TableAction,
} from "@/composables/table.ts";
import { DELETE_ICON, EDIT_ICON } from "@/constants/iconsMap.ts";
import type { DeleteItem } from "@/types/index.ts";
import { computed, defineProps, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import VariantManageModal from "./VariantManageModal.vue";

interface VariantsTabProps {
  productId: number | null;
}

defineProps<VariantsTabProps>();

const loading = ref(false);
const variants = ref<ProductVariant[]>([]);
const deletingVariant = ref<DeleteItem | null>(null);

const {} = useProducts();
const { t } = useI18n();
const { editingId, showManageModal } = useEditModal();
const { getProductVariants } = useProducts();

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
  showManageModal.value = true;
};

const closeManageModal = () => {
  showManageModal.value = false;
};

const deleteBrand = (id: number) => {
  deletingVariant.value = { id };
};

const deleteSuccessHandler = () => {
  deletingVariant.value = null;
  // getBrands();
};

onMounted(async () => {
  loading.value = true;
  try {
    variants.value = (await getProductVariants()).data;
  } catch (error) {
    //
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="mt-6">
    <v-card variant="outlined" :loading="loading">
      <v-data-table
        :headers="headers"
        :items="variants"
        :loading="loading"
        hide-default-footer
        :no-data-text="t('common.noData')"
      >
        <template #item.actions="{ item }">
          <TableActions
            :actions="actions"
            @delete="deleteBrand(item.id)"
            @edit="editHandler(item.id)"
          />
        </template>
      </v-data-table>
    </v-card>

    <VariantManageModal
      :open="showManageModal"
      :productId="productId"
      @close="closeManageModal"
    />
  </div>
</template>
