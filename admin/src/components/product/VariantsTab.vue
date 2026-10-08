<script setup lang="ts">
import { useHelpers } from "@/composables/helpers";
import { useProducts, type ProductVariant } from "@/composables/products";
import { FILAMENT_API_FOR_SELECT } from "@/constants/api-const.ts";
import $http from "@/plugins/axios.ts";
import { useField, useForm } from "vee-validate";
import { defineProps, onMounted, ref, shallowRef } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";

interface VariantsTabProps {
  variants: ProductVariant[];
}

defineProps<VariantsTabProps>();

const loading = shallowRef(false);
const loadingFilaments = shallowRef(false);
const processing = shallowRef(false);

const filaments = ref([]);
const images = ref([]);

const { errorMessage } = useHelpers();
const { handleSubmit } = useForm({});
const {} = useProducts();
const { t } = useI18n();

const filamentId = useField<any>("filamentId", { required: true });
const price = useField<number>("price", { float: true, notZero: true });
const stock = useField<number>("stock", { number: true });

const submit = handleSubmit(async (event) => {
  processing.value = true;

  try {
  } catch (error: any) {
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
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
  <div class="mt-6">
    <v-card
      max-width="900"
      class="mx-auto"
      variant="outlined"
      :loading="loading"
    >
      <v-card-text>
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
          hide-cancel-btn
          @confirm="submit"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
