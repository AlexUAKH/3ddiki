<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import GeneralTab from "@/components/product/GeneralTab.vue";
import VariantsTab from "@/components/product/VariantsTab.vue";
import { useProducts, type ProductType } from "@/composables/products";
import { EDIT_ICON } from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import { computed, defineProps, onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

interface EditProps {}

defineProps<EditProps>();

const tab = ref(1);
const productId = ref<number | null>(null);
const product = ref<ProductType | null>(null);

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getProduct } = useProducts();

const isEdit = computed(() => route.name === ERouteNames.productsEdit);
// const isEdit = computed(() => String(route.params.id || "") || null);

const generalInfoCreatedHandler = (id: number) => {
  productId.value = id;
  tab.value++;
};

const back = () => {
  router.go(-1);
};

onBeforeMount(async () => {
  if (isEdit.value) {
    productId.value = +String(route.params.id);
    const res = await getProduct(productId.value);
    console.log("edit: ", res.data);
    product.value = res.data;
  }
});
</script>

<template>
  <div class="">
    <PageHeader
      :header="isEdit ? t('products.edit') : t('products.create')"
      :icon="isEdit ? EDIT_ICON : ''"
      show-back
      @back="back"
    >
    </PageHeader>

    <div class="mt-4">
      <!-- grow -->
      <v-tabs
        v-model="tab"
        fixed-tabs
        slider-transition="fade"
        slider-transition-duration="900"
        slider-color="#f78166"
      >
        <v-tab :value="1" class="text-title-large">General</v-tab>
        <v-tab :value="2" class="text-title-large" :disabled="!productId">
          Variants
        </v-tab>
      </v-tabs>

      <!-- crossfade -->
      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
          <GeneralTab
            :productId="productId"
            :product="product"
            @created="generalInfoCreatedHandler"
          />
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          <VariantsTab :variants="product?.variants || []" />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </div>
</template>
