<script setup lang="ts">
import { useHelpers } from "@/composables/helpers.ts";
import { useProducts } from "@/composables/products.ts";
import { useField, useForm } from "vee-validate";
import { defineEmits, defineProps, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";

interface Props {
  open: boolean;
  id: number;
  currentPercent: number;
}

const props = defineProps<Props>();

const emits = defineEmits(["change", "close"]);

const loading = ref(false);
const processing = ref(false);

const { errorMessage } = useHelpers();
const { handleSubmit, resetForm } = useForm({});
const { changeProductDiscount } = useProducts();
const { t } = useI18n();

const discount = useField<number>("discount", { number: true });

const submit = handleSubmit(async (event) => {
  processing.value = true;
  try {
    const data = {
      discount: event.discount,
    };
    await changeProductDiscount(props.id, data);

    toast.success(t("product.discountChangedSuccessfully"));

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

onMounted(() => {
  discount.value.value = props.currentPercent;
});
</script>

<template>
  <v-dialog :model-value="open" max-width="400" persistent transition="scale">
    <v-card :loading="loading">
      <v-card-title class="text-center">
        {{ t("products.changeDiscount") }}
      </v-card-title>

      <v-card-text>
        <v-form>
          <v-number-input
            class="mt-2"
            v-model="discount.value.value"
            :precision="0"
            :min="0"
            :step="1"
            :error-messages="t(discount.errorMessage.value || '')"
            :label="`${t('common.discount')}, %`"
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
