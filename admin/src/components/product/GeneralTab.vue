<script setup lang="ts">
import { useHelpers } from "@/composables/helpers";
import {
  useProducts,
  type CreateProduct,
  type ProductType,
} from "@/composables/products";
import { PRODUCT_CATEGORY_API_FOR_SELECT } from "@/constants/api-const.ts";
import $http from "@/plugins/axios.ts";
import { useField, useForm } from "vee-validate";
import {
  defineEmits,
  defineProps,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";
import MarkdownInstruction from "../common/markdownInstruction.vue";

interface GeneralTabProps {
  productId?: number | null;
  product: Partial<ProductType> | null;
}

const props = defineProps<GeneralTabProps>();
const emits = defineEmits(["success"]);

const minLength = 3;
const maxLength = 254;

const loading = ref(false);
const loadingCategories = shallowRef(false);
const processing = ref(false);
const categories = ref([]);

const { errorMessage } = useHelpers();
const { handleSubmit, resetForm } = useForm({});
const { createProduct, updateProduct } = useProducts();
const { t } = useI18n();

const name = useField<string>("name", { required: true, min: minLength });
const categoryId = useField<any>("categoryId", { required: true });
const description = useField<string>("description", { max: maxLength });
const weight = useField<number>("weight", {
  number: true,
  not_zero: true,
});
const sizeX = useField<number>("sizeX", {
  float: true,
  not_zero: true,
});
const sizeY = useField<number>("sizeY", {
  float: true,
  not_zero: true,
});
const sizeZ = useField<number>("sizeZ", {
  float: true,
  not_zero: true,
});
const discount = useField<number>("discount", { number: true });

const submit = handleSubmit(async (event) => {
  processing.value = true;

  const data: CreateProduct = {
    name: event.name,
    categoryId: event.categoryId,
    description: event.description,
    discount: event.discount,
    sizeX: event.sizeX,
    sizeY: event.sizeY,
    sizeZ: event.sizeZ,
    weight: event.weight,
  };

  try {
    props.productId
      ? await updateProduct(props.productId, data)
      : await createProduct(data);

    toast.success(
      props.productId
        ? t("product.productWasUpdatedSuccessfully")
        : t("product.newProductCreated"),
    );
    emits("success");
  } catch (error: any) {
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

watch(
  () => props.product,
  () => {
    loading.value = true;
    if (props.product) {
      name.value.value = props.product.name || "";
      categoryId.value.value = props.product.categoryId || "";
      description.value.value = props.product.description || "";
      weight.value.value = props.product.weight || 0;
      sizeX.value.value = props.product.sizeX || 0;
      sizeY.value.value = props.product.sizeY || 0;
      sizeZ.value.value = props.product.sizeZ || 0;
      discount.value.value = props.product.discount || 0;
    }

    loading.value = false;
  },
);

onMounted(async () => {
  loadingCategories.value = true;
  $http
    .get(PRODUCT_CATEGORY_API_FOR_SELECT)
    .then((res) => {
      console.log("getCat: ", res);

      categories.value = res.data;
    })
    .catch(() => {})
    .finally(() => {
      loadingCategories.value = false;
    });
});
</script>

<template>
  <div class="mt-6">
    <v-card
      max-width="900"
      class="mx-auto"
      variant="outlined"
      :loading="loading"
    >
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="name.value.value"
            :error-messages="
              t(name.errorMessage.value || '', { limit: minLength })
            "
            :label="t('common.nameObj')"
          />
          <v-autocomplete
            class="mt-2"
            v-model="categoryId.value.value"
            :items="categories"
            item-value="id"
            item-title="name"
            :loading="loadingCategories"
            :error-messages="t(categoryId.errorMessage.value || '')"
            :label="t('common.category')"
          />
          <v-number-input
            class="mt-2"
            v-model="weight.value.value"
            :precision="0"
            :step="1"
            :min="0"
            :error-messages="t(weight.errorMessage.value || '')"
            :label="`${t('common.weight')}, ${t('common.g')}`"
          />
          <v-number-input
            class="mt-2"
            v-model="sizeX.value.value"
            :precision="1"
            :min="0"
            :step="0.1"
            :error-messages="t(sizeX.errorMessage.value || '')"
            :label="`${t('common.sizeX')}, ${t('common.sm')}`"
          />
          <v-number-input
            class="mt-2"
            v-model="sizeY.value.value"
            :precision="1"
            :min="0"
            :step="0.1"
            :error-messages="t(sizeY.errorMessage.value || '')"
            :label="`${t('common.sizeY')}, ${t('common.sm')}`"
          />
          <v-number-input
            class="mt-2"
            v-model="sizeZ.value.value"
            :precision="1"
            :min="0"
            :step="0.1"
            :error-messages="t(sizeZ.errorMessage.value || '')"
            :label="`${t('common.sizeZ')}, ${t('common.sm')}`"
          />
          <v-number-input
            class="mt-2"
            v-model="discount.value.value"
            :precision="0"
            :min="0"
            :step="1"
            :error-messages="t(discount.errorMessage.value || '')"
            :label="`${t('common.discount')}, %`"
          />

          <v-textarea
            class="mt-2"
            v-model="description.value.value"
            hide-details="auto"
            :error-messages="
              t(description.errorMessage.value || '', { limit: minLength })
            "
            :label="t('common.description') + ' Markdown'"
          >
          </v-textarea>
          <MarkdownInstruction />
        </v-form>

        <FormActions
          :processing="processing"
          :ok-btn-label="t('common.save')"
          hide-cancel-btn
          @confirm="submit"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
