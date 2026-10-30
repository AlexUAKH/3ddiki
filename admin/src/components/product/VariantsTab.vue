<script setup lang="ts">
import {
  useProducts,
  type ImageType,
  type ProductVariant,
} from "@/composables/products";
import {
  EActions,
  type Header,
  type TableAction,
} from "@/composables/table.ts";
import { PRODUCT_VARIANT_EDIT_API } from "@/constants/api-const.ts";
import { DELETE_ICON, EDIT_ICON } from "@/constants/iconsMap.ts";
import type { DeleteItem } from "@/types/index.ts";
import { computed, defineProps, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VAvatarGroup } from "vuetify/labs/VAvatarGroup";
import DeleteItemModal from "../DeleteItemModal.vue";
import ImagePreview from "../ImagePreview.vue";
import TableActions from "../TableActions.vue";
import VariantManageModal from "./VariantManageModal.vue";

interface VariantsTabProps {
  productId: number | null;
}

const props = defineProps<VariantsTabProps>();

const loading = ref(false);
const variants = ref<ProductVariant[]>([]);
const imagesToPreview = ref<ImageType[]>([]);
const deletingVariant = ref<DeleteItem | null>(null);
const editingId = ref<number | null>(null);
const showManageModal = ref(false);

const {} = useProducts();
const { t } = useI18n();
const { getProductVariants } = useProducts();

const productId = computed(() => props.productId || null);

const headers = computed<Header[]>(() => [
  {
    title: "ID",
    key: "id",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.filament"),
    key: "filament",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.image"),
    key: "images",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.price"),
    key: "price",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.stock"),
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
  editingId.value = id;
  showManageModal.value = true;
};

const closeManageModal = () => {
  editingId.value = null;
  showManageModal.value = false;
};

const deleteVariant = (id: number) => {
  deletingVariant.value = { id };
};

const deleteSuccessHandler = () => {
  deletingVariant.value = null;
  getVariants();
};

const changeVariantHandler = (closeModal: boolean = true) => {
  console.log("closeModal: ", closeModal);

  if (closeModal) closeManageModal();
  getVariants();
};

const getVariants = async () => {
  if (!productId.value) return;
  loading.value = true;
  try {
    variants.value = (await getProductVariants(productId.value)).data;
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const preview = (images: ImageType[]) => {
  imagesToPreview.value = images;
};
const closePreview = () => {
  imagesToPreview.value = [];
};

onMounted(async () => {
  await getVariants();
});
</script>

<template>
  <div class="">
    <div class="text-end">
      <v-btn class="mb-2" color="info" @click="createHandler">
        {{ t("common.create") }}
      </v-btn>
    </div>

    <v-card variant="outlined">
      <v-data-table
        :headers="headers"
        :items="variants"
        :loading="loading"
        hide-default-footer
        :no-data-text="t('common.noData')"
      >
        <!-- :items="getImages(item.images)" -->
        <template #item.images="{ item }">
          <VAvatarGroup
            border="md surface opacity-100"
            :items="item.images"
            :item-props="(item) => ({ image: item.path })"
            :limit="3"
            @click.stop="preview(item.images || [])"
          >
            <template v-slot:item="{ props }">
              <v-avatar v-bind="props" rounded="lg"></v-avatar>
            </template>
          </VAvatarGroup>
        </template>
        <template #item.actions="{ item }">
          <TableActions
            :actions="actions"
            @delete="deleteVariant(item.id)"
            @edit="editHandler(item.id)"
          />
        </template>
      </v-data-table>
    </v-card>

    <ImagePreview
      v-if="imagesToPreview?.length"
      :images="imagesToPreview"
      @close="closePreview"
    />

    <VariantManageModal
      v-if="showManageModal"
      :open="showManageModal"
      :product-id="productId"
      :variant-id="editingId"
      @change="changeVariantHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingVariant"
      :open="!!deletingVariant"
      :item="deletingVariant"
      :url="PRODUCT_VARIANT_EDIT_API"
      @success="deleteSuccessHandler"
      @reject="deletingVariant = null"
    />
  </div>
</template>
