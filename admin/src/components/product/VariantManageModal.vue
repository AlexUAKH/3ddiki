<script setup lang="ts">
import { useHelpers } from "@/composables/helpers";
import { useProducts, type ImageType } from "@/composables/products.ts";
import { FILAMENT_API_FOR_SELECT } from "@/constants/api-const";
import $http from "@/plugins/axios.ts";
import type { SelectList } from "@/types";
import { useField, useForm } from "vee-validate";
import { onMounted, ref, shallowRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";
import ImagePreview from "../ImagePreview.vue";

interface VariantItemProps {
  open: boolean;
  variantId: number | null;
  productId: number | null;
}

const props = defineProps<VariantItemProps>();
const emits = defineEmits(["change", "close"]);

const loading = shallowRef(false);
const loadingFilaments = shallowRef(false);
const processing = shallowRef(false);

const filaments = ref<SelectList[]>([]);
const images = ref([]);
const oldImages = ref<ImageType[]>([]);
const imageToPreview = ref<ImageType | null>(null);
const deleteImageIds = ref<number[]>([]);

const { errorMessage } = useHelpers();
const { handleSubmit, resetForm } = useForm({});
const { t } = useI18n();
const { getProductVariant, createProductVariant, updateProductVariant } =
  useProducts();

const filamentId = useField<any>("filamentId", { required: true });
const price = useField<number>("price", { float: true });
const stock = useField<number>("stock", { number: true });

const submit = handleSubmit(async (event) => {
  processing.value = true;

  if (!props.productId) {
    toast.error("Product ID must be provided");
    processing.value = false;

    return;
  }

  if (!props.variantId && images.value.length == 0) {
    toast.error("Додайте хочаб одне зображення");
    processing.value = false;
    return;
  }

  const formData = new FormData();

  formData.append("filamentId", event.filamentId);
  if (event.price && event.price > 0) {
    formData.append("price", event.price.toString());
  } else {
    formData.append("price", "");
  }
  formData.append("productId", props.productId.toString());
  formData.append("stock", event.stock);
  if (images.value.length) {
    images.value.forEach((image) => {
      formData.append("images", image);
    });
  }
  if (deleteImageIds.value.length) {
    formData.append("deleteImageIds", JSON.stringify(deleteImageIds.value));
  }

  try {
    props.variantId
      ? await updateProductVariant(+props.variantId, formData)
      : await createProductVariant(+props.productId, formData);

    toast.success(
      props.variantId
        ? t("products.variantWasUpdatedSuccessfully")
        : t("products.newVariantCreated"),
    );

    emits("change");
    resetForm();
  } catch (error: any) {
    // if (error) {
    errorMessage(error).includes("Unique constraint")
      ? toast.error("Варіант з такий філаментом вже існує ")
      : toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

const preview = (image: any) => {
  imageToPreview.value = image;
};
const closePreview = () => {
  imageToPreview.value = null;
};
// const deleteImage = (img: ImageType) => {
//   deletingImage.value = { id: img.id, name: "image" };
// };
const deleteImage = ({ id }: ImageType) => {
  oldImages.value = oldImages.value.filter((el) => el.id !== id);
  // emits("change", false);

  deleteImageIds.value.push(id);
};

watchEffect(async () => {
  if (props.variantId) {
    loading.value = true;
    try {
      const response = await getProductVariant(+props.variantId);

      filamentId.value.value = response.data.filamentId;
      price.value.value = response.data.price;
      stock.value.value = response.data.stock;

      oldImages.value = response.data.images;
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
      <v-card-title class="text-center">
        {{
          `${variantId ? t("common.edit") : t("common.create")} ${t("products.variant")}`
        }}
      </v-card-title>
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
            name="filamentId"
          />
          <div class="text-warning">
            Якщо залишити ціну пустою або поставити 0, то вона буде розрахована
            автоматично з урахуванням собівартості філамента та націнки"
          </div>
          <v-number-input
            class="mt-2"
            v-model="price.value.value"
            :precision="2"
            :step="0.01"
            :min="0"
            :error-messages="t(price.errorMessage.value || '')"
            :label="`${t('common.price')}, ${t('common.uah')}`"
            name="price"
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

          <div v-if="oldImages.length" class="d-flex ga-4 mb-4">
            <v-badge
              v-for="(img, i) in oldImages"
              :key="i"
              color="error"
              :min-height="20"
              :min-width="20"
              :model-value="oldImages.length > 1"
            >
              <template #badge>
                <v-icon color="white" size="large" @click="deleteImage(img)"
                  >mdi-trash-can-outline</v-icon
                >
              </template>

              <v-avatar
                :image="img.path"
                :rounded="4"
                size="x-large"
                @click.stop="preview(img)"
              >
              </v-avatar>
            </v-badge>
          </div>

          <v-file-upload
            v-model="images"
            clearable
            density="comfortable"
            inset-file-list
            multiple
            show-size
            :browse-text="t('common.chooseFile')"
            :title="t('common.dragAndDropFilesHere')"
          >
            <template v-slot:item="{ props: itemProps }">
              <v-file-upload-item v-bind="itemProps" lines="two">
                <template v-slot:prepend>
                  <v-avatar
                    rounded="lg"
                    size="32"
                    style="transform: rotate(45deg)"
                    class="mr-3"
                  ></v-avatar>
                </template>

                <template v-slot:clear="{ props: clearProps }">
                  <v-btn
                    color="error"
                    icon="mdi-trash-can"
                    v-bind="clearProps"
                  ></v-btn>
                </template>
              </v-file-upload-item>
            </template>
          </v-file-upload>
        </v-form>

        <FormActions
          :processing="processing"
          :ok-btn-label="t('common.save')"
          @confirm="submit"
          @reject="$emit('close')"
        />
      </v-card-text>
    </v-card>

    <ImagePreview
      v-if="imageToPreview"
      :images="[imageToPreview]"
      @close="closePreview"
    />
  </v-dialog>
</template>
