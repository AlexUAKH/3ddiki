<script setup lang="ts">
import { PRODUCTS_API } from "~/constants/api";
import { PRODUCTS_PAGE } from "~/constants/routeNames";
import type { Product } from "~/types";

// interface ProductProps {}

// defineProps<ProductProps>();
const SPECIFICATION_TAB = shallowRef("Характеристики");
const REVIEWS_TAB = shallowRef("Reviews");

const DELIVERY_TAB = shallowRef("delivery");
const PAYMENT_TAB = shallowRef("payment");
const QUESTION_TAB = shallowRef("question");

const mainTabs = [SPECIFICATION_TAB.value, REVIEWS_TAB.value];
const infoTabs = [DELIVERY_TAB.value, PAYMENT_TAB.value, QUESTION_TAB.value];

const previewImageInd = ref<number | null>(null);
const currentSlide = ref(0);
const selectedVariantId = ref<number | null>(null);
const mainCarousel = ref<any>(null);
const previewCarousel = ref<any>(null);

const currentMainTab = ref(SPECIFICATION_TAB.value);
const currentInfoTab = ref(DELIVERY_TAB.value);

const router = useRouter();
const route = useRoute();

const { t } = useI18n();

useHead({
  title: t("products.menu"),
});

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: false,
};

const previewCarouselConfig = {
  itemsToShow: 4,
  snapAlign: "center-even" as any,
  gap: 10,
  transition: 300,
  wrapAround: false,
};

const productId = computed(() => route.params.id || null);

const {
  data: product,
  pending,
  refresh,
} = await useAsyncApi<Product>(PRODUCTS_API + "/" + productId.value, {
  key: "product",
  method: "GET",
  default: () => ({}) as Product,
});

const productImages = computed(() => {
  if (product.value?.variants && product.value.variants.length === 0) {
    console.log([]);
    return [];
  }
  const images =
    product.value.variants.map((variant) => variant.images || []).flat() || [];
  return images;
});

const currentVariant = computed(() =>
  (product.value?.variants || []).find(
    (el) => el.id === selectedVariantId.value,
  ),
);

const onMainSlide = ({ currentSlideIndex: index }: any) => {
  console.log("onMainSlide: ", index);

  currentSlide.value = index;

  previewCarousel.value?.slideTo(index);
};

const onPreviewClick = (index: number) => {
  currentSlide.value = index;

  mainCarousel.value?.slideTo(index);
  previewCarousel.value?.slideTo(index);
};

const setSelectedVariantId = (id: number) => {
  selectedVariantId.value = id;

  const imgIndex = currentVariant.value?.images[0]
    ? productImages.value.indexOf(currentVariant.value.images[0])
    : null;

  if (imgIndex || imgIndex === 0) {
    currentSlide.value = imgIndex;
    mainCarousel.value?.slideTo(imgIndex);
    previewCarousel.value?.slideTo(imgIndex);
  }
};

const setFavorite = (id: number) => {
  console.log("setFavorite to: ", id);
};

const goToProducts = () => {
  router.push({ name: PRODUCTS_PAGE });
};

watch(
  () => product.value?.variants,
  (newVariants) => {
    if (newVariants && newVariants.length > 0) {
      selectedVariantId.value = newVariants[0]?.id || null;
    }
  },
  { immediate: true },
);
</script>

<template>
  <AppContainer>
    <AppBack @click="goToProducts" />

    <SkeletonProduct v-if="pending" />

    <div v-else-if="product && Object.keys(product)?.length" class="mt-8">
      <div class="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6 md:gap-10">
        <div class="">
          <div class="w-full mx-auto product-carousel">
            <AppCarousel
              class="bg-gray-300 dark:bg-gray-900"
              ref="mainCarousel"
              v-bind="carouselConfig"
              @slide-end="onMainSlide"
            >
              <AppSlide
                v-for="(img, ind) in productImages"
                :key="ind"
                @click="previewImageInd = ind"
              >
                <img
                  :src="img.path"
                  alt=""
                  class="h-full max-h-80 md:max-h-112.5 max-w-full object-contain cursor-pointer"
                />
              </AppSlide>

              <template #addons>
                <AppPagination />
              </template>
            </AppCarousel>

            <AppCarousel
              class="mt-4"
              ref="previewCarousel"
              v-bind="previewCarouselConfig"
            >
              <AppSlide
                v-for="(img, ind) in productImages"
                :key="ind"
                @click="onPreviewClick(ind)"
              >
                <img
                  :src="img.path"
                  alt=""
                  class="max-w-full aspect-square object-contain cursor-pointer rounded-md overflow-hidden"
                  :class="{
                    'border border-gray-600 dark:border-gray-400':
                      currentSlide === ind,
                  }"
                />
              </AppSlide>
            </AppCarousel>
          </div>
        </div>

        <div class="overflow-hidden">
          <div class="font-serif font-medium text-4xl md:text-6xl">
            {{ product.name }}
          </div>

          <ProductsRateWidget class="mt-4" :rate="product.rate" />

          <div class=""></div>

          <div class="space-y-4 mt-6">
            <div v-if="product.description" class="">
              <h4 class="text-lg">Description:</h4>
              <div class="">{{ product.description }}</div>
            </div>

            <div class="">
              <h4 class="text-lg">Виберіть variant</h4>
              <ol class="flex gap-4 items-center text-lg">
                <li
                  v-for="variant in product.variants"
                  class="flex flex-col items-center gap-2 px-2 py-1 border rounded-md cursor-pointer transition-colors"
                  :class="[
                    variant.id === selectedVariantId
                      ? 'border-gray-300'
                      : 'border-gray-600',
                  ]"
                  @click="setSelectedVariantId(variant.id)"
                >
                  <div class="flex gap-2 items-center">
                    <div
                      class="rounded-full w-6 h-6 border border-gray-600 dark:border-gray-400"
                      :style="{ background: variant.filament.colors[0] }"
                    >
                      <!-- {{ variant.filament.colors[0] }} -->
                    </div>
                  </div>
                  <div class="">{{ variant.filament.type }}</div>
                </li>
              </ol>
            </div>

            <div
              class="flex gap-10 items-center justify-between md:justify-start"
            >
              <ProductsPriceWidget
                class="text-3xl"
                :price="currentVariant?.price || 0"
                :discount="product.discount || 0"
              />

              <div class="flex items-center gap-3">
                <AppButton class="bg-primary text-white px-6 text-lg font-bold">
                  Buy
                </AppButton>
                <AppButton class="" @click="setFavorite(product.id)">
                  <Icon
                    :name="
                      product.favorite
                        ? 'mdi:cards-heart'
                        : 'mdi:cards-heart-outline'
                    "
                    class="size-10"
                    :class="{ 'text-primary ': !product.favorite }"
                  />
                  <span class="hidden md:inline-block"> Add to favorites </span>
                </AppButton>
              </div>
            </div>

            <AppTabs
              :tabs="mainTabs"
              :active-tab="currentMainTab"
              :badge="{ [REVIEWS_TAB]: product.reviews?.length || 0 }"
              @select="currentMainTab = $event"
            >
              <div v-if="currentMainTab === SPECIFICATION_TAB" class="">
                <ol>
                  <li>Матеріал PETG</li>
                  <li>length: {{ product.sizeX }}</li>
                  <li>width: {{ product.sizeY }}</li>
                  <li>height: {{ product.sizeZ }}</li>
                  <li>Weight: {{ product.weight }}</li>
                </ol>
              </div>
              <div v-if="currentMainTab === REVIEWS_TAB" class="">
                <ProductsReviews :reviews="product.reviews" />
              </div>
            </AppTabs>

            <AppTabs
              :tabs="infoTabs"
              :active-tab="currentInfoTab"
              @select="currentInfoTab = $event"
            >
              <ProductsDeliveryTab v-if="currentInfoTab === DELIVERY_TAB" />

              <ProductsPaymentTab v-if="currentInfoTab === PAYMENT_TAB" />

              <ProductsQuestionsTab v-if="currentInfoTab === QUESTION_TAB" />
            </AppTabs>
          </div>

          <div class="">currentVariant: {{ currentVariant }}</div>
          <div class="">
            <pre>
          product: {{ product }}
          </pre
            >
          </div>
        </div>
      </div>
    </div>

    <div v-else class="">Продукт не знайдений</div>

    <Teleport to="#teleports">
      <AppImagePreview
        v-if="previewImageInd"
        :images="productImages"
        :preview-image-ind="previewImageInd"
        @close="previewImageInd = null"
      />
    </Teleport>
  </AppContainer>
</template>
