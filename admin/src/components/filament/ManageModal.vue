<script setup lang="ts">
import { useHelpers } from "@/composables/helpers.ts";
import {
  FILAMENT_API,
  FILAMENT_BRANDS_API_FOR_SELECT,
  FILAMENT_COLORS_API_FOR_SELECT,
  FILAMENT_TYPES_API_FOR_SELECT,
} from "@/constants/api-const.ts";
import $http from "@/plugins/axios.ts";
import { useField, useForm } from "vee-validate";
import { onMounted, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";

const minNameLength = 3;

interface Props {
  open: boolean;
  id?: string | number | undefined;
}

const props = defineProps<Props>();

const emits = defineEmits(["change", "close"]);

const loading = ref(false);
const processing = ref(false);
const typesList = ref([]);
const brandsList = ref([]);
const colorsList = ref([]);

const { errorMessage } = useHelpers();
const { handleSubmit, resetForm } = useForm({});
const { t } = useI18n();

const name = useField("name", { required: true, min: minNameLength });
const typeId = useField<any>("typeId", { required: true });
const brandId = useField<any>("brandId", { required: true });
const colors = useField<any>("colors", { required: true, one: true });
const price = useField("price", {
  required: true,
  number: true,
  not_zero: true,
});
const stock = useField("stock", { required: true, number: true });

const submit = handleSubmit(async (event) => {
  processing.value = true;
  try {
    props.id
      ? await $http.patch(`${FILAMENT_API}/${props.id}`, event)
      : await $http.post(FILAMENT_API, event);

    toast.success(
      props.id
        ? t("filament.filamentWasUpdatedSuccessfully")
        : t("filament.newFilamentCreated"),
    );

    emits("change");
    resetForm();
  } catch (error: any) {
    // if (error) {
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

watchEffect(async () => {
  if (props.id) {
    loading.value = true;
    try {
      const response = await $http.get(`${FILAMENT_API}/${props.id}`);

      name.value.value = response.data.name;
      typeId.value.value = response.data.typeId;
      brandId.value.value = response.data.brandId;
      colors.value.value = response.data.colors;
      price.value.value = response.data.price;
      stock.value.value = response.data.stock;
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      loading.value = false;
    }
  }
});
onMounted(async () => {
  loading.value = true;
  try {
    const res = (await Promise.allSettled([
      $http.get(FILAMENT_TYPES_API_FOR_SELECT),
      $http.get(FILAMENT_BRANDS_API_FOR_SELECT),
      $http.get(FILAMENT_COLORS_API_FOR_SELECT),
    ])) as any;

    typesList.value = res[0]["value"]?.data || [];
    brandsList.value = res[1]["value"]?.data || [];
    colorsList.value = res[2]["value"]?.data || [];
  } catch (error) {
    toast.error(errorMessage(error));
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-dialog :model-value="open" max-width="400" persistent transition="scale">
    <v-card :loading="loading">
      <v-card-title class="text-center">
        {{
          `${id ? t("common.edit") : t("common.create")} ${t("filament.filament", 2)}`
        }}
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="name.value.value"
            :error-messages="
              t(name.errorMessage.value || '', { limit: minNameLength })
            "
            :label="t('common.nameObj')"
          />
          <v-autocomplete
            class="mt-2"
            v-model="typeId.value.value"
            :items="typesList"
            item-value="id"
            item-title="name"
            :error-messages="t(typeId.errorMessage.value || '')"
            :label="t('common.type')"
          />
          <v-autocomplete
            class="mt-2"
            v-model="brandId.value.value"
            :items="brandsList"
            item-value="id"
            item-title="name"
            :error-messages="t(brandId.errorMessage.value || '')"
            :label="t('common.brand')"
          />
          <v-autocomplete
            class="mt-2"
            v-model="colors.value.value"
            :items="colorsList"
            multiple
            item-value="id"
            item-title="name"
            :error-messages="t(colors.errorMessage.value || '')"
            :label="t('common.color')"
          />
          <v-text-field
            class="mt-2"
            v-model="price.value.value"
            type="number"
            min="0"
            step="0.01"
            :error-messages="t(price.errorMessage.value || '')"
            :label="`${t('common.price')}, ${t('common.uah')}/${t('common.kg')}`"
          />
          <v-text-field
            class="mt-2"
            v-model="stock.value.value"
            type="number"
            min="0"
            step="1"
            :error-messages="t(stock.errorMessage.value || '')"
            :label="`${t('common.stock')}, ${t('common.g')}`"
          />
        </v-form>

        <FormActions
          :processing="processing"
          @confirm="submit"
          @reject="$emit('close')"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
