<script setup lang="ts">
import { useHelpers } from "@/composables/helpers.ts";
import { FILAMENT_TYPES_API } from "@/constants/api-const.ts";
import $http from "@/plugins/axios.ts";
import { useField, useForm } from "vee-validate";
import { ref, watchEffect } from "vue";
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

const { errorMessage } = useHelpers();
const { handleSubmit, handleReset, isSubmitting } = useForm({});
const { t } = useI18n();

const name = useField("name", { required: true, min: minNameLength });

const submit = handleSubmit(async (event) => {
  processing.value = true;
  try {
    props.id
      ? await $http.patch(`${FILAMENT_TYPES_API}/${props.id}`, event)
      : await $http.post(FILAMENT_TYPES_API, event);

    toast.success(
      props.id
        ? t("filamentTypes.typeWasUpdatedSuccessfully")
        : t("filamentTypes.newTypeCreated"),
    );

    emits("change");
  } catch (error: any) {
    // if (error) {
    console.log("onRequestError: ", errorMessage(error));
    toast.error(errorMessage(error));
  } finally {
    // processing.value = false;
  }
});

watchEffect(async () => {
  if (props.id) {
    loading.value = true;
    try {
      const response = await $http.get(`${FILAMENT_TYPES_API}/${props.id}`);

      name.value.value = response.data.name;
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <v-dialog :model-value="open" max-width="400" persistent transition="scale">
    <v-card>
      <v-card-title class="text-center">
        {{
          `${id ? t("common.edit") : t("common.create")} ${t("filamentTypes.filamentType", 2)}`
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
