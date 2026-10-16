<script setup lang="ts">
import { useHelpers } from "@/composables/helpers";
import {
  useProducts,
  type CreateProductVariant,
} from "@/composables/products.ts";
import { FILAMENT_API_FOR_SELECT } from "@/constants/api-const";
import $http from "@/plugins/axios.ts";
import type { SelectList } from "@/types";
import { useField, useForm } from "vee-validate";
import {
  defineEmits,
  defineProps,
  onMounted,
  ref,
  shallowRef,
  watchEffect,
} from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";

interface VariantItemProps {
  open: boolean;
  productId: number | null;
}

const props = defineProps<VariantItemProps>();
const emits = defineEmits(["change", "close"]);

const loading = shallowRef(false);
const loadingFilaments = shallowRef(false);
const processing = shallowRef(false);

const filaments = ref<SelectList[]>([]);
const images = ref([]);

const { errorMessage } = useHelpers();
const { handleSubmit, resetForm } = useForm({});
const { t } = useI18n();
const { getProductVariant, createProductVariant, updateProductVariant } =
  useProducts();

const filamentId = useField<any>("filamentId", { required: true });
const price = useField<number>("price", { float: true, not_zero: true });
const stock = useField<number>("stock", { number: true });

const submit = handleSubmit(async (event) => {
  processing.value = true;

  if (!props.productId) {
    toast.error("Product ID must be provided");
    processing.value = false;

    return;
  }

  const data: CreateProductVariant = {
    filamentId: event.filamentId,
    files: [],
    price: event.price,
    productId: +props.productId,
    stock: event.stock,
  };

  try {
    props.productId
      ? await updateProductVariant(+props.productId, data)
      : await createProductVariant(data);

    toast.success(
      props.productId
        ? t("products.variantWasUpdatedSuccessfully")
        : t("products.newVariantCreated"),
    );

    emits("change");
    resetForm();
  } catch (error: any) {
    // if (error) {
    console.log("onRequestError: ", errorMessage(error));
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

watchEffect(async () => {
  if (props.productId) {
    loading.value = true;
    try {
      const response = await getProductVariant(+props.productId);

      // name.value.value = response.data.name;
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      loading.value = false;
    }
  }
});

onMounted(() => {
  loadingFilaments.value = true;
  $http
    .get(FILAMENT_API_FOR_SELECT)
    .then((res) => {
      filaments.value = res.data;
    })
    .catch(() => {})
    .finally(() => {
      loadingFilaments.value = false;
    });
});
</script>

<template>
  <v-dialog :model-value="open" max-width="700" persistent transition="scale">
    <v-card class="mx-auto w-100" :loading="loading">
      <v-card-text>
        <div class="">id: {{ productId }}</div>
        <v-form>
          <v-autocomplete
            class="mt-2"
            v-model="filamentId.value.value"
            :items="filaments"
            item-value="id"
            item-title="name"
            :loading="loadingFilaments"
            :error-messages="t(filamentId.errorMessage.value || '')"
            :label="t('common.filament')"
          />
          <v-number-input
            class="mt-2"
            v-model="price.value.value"
            :precision="2"
            :step="0.01"
            :min="0"
            :error-messages="t(price.errorMessage.value || '')"
            :label="`${t('common.price')}, ${t('common.uah')}`"
          />
          <v-number-input
            class="mt-2"
            v-model="stock.value.value"
            :precision="0"
            :step="1"
            :min="0"
            :error-messages="t(stock.errorMessage.value || '')"
            :label="t('common.stock')"
          />
        </v-form>

        <FormActions
          :processing="processing"
          :ok-btn-label="t('common.save')"
          @confirm="submit"
          @reject="$emit('close')"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
