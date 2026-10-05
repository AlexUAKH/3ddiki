<script setup lang="ts">
import type { MediaFile, Product } from "~/types";

// interface ProductProps {}

// defineProps<ProductProps>();
const SPECIFICATION_TAB = "Характеристики";
const REVIEWS_TAB = "Reviews";

const DELIVERY_TAB = "delivery";
const PAYMENT_TAB = "payment";
const QUESTION_TAB = "question";

const mainTabs = [SPECIFICATION_TAB, REVIEWS_TAB];
const infoTabs = [DELIVERY_TAB, PAYMENT_TAB, QUESTION_TAB];

const previewImage = shallowRef<MediaFile | null>(null);
const currentSlide = ref(0);
const selectedVariantId = ref<number | null>(2);
const mainCarousel = ref<any>(null);
const previewCarousel = ref<any>(null);

const currentMainTab = ref(SPECIFICATION_TAB);
const currentInfoTab = ref(DELIVERY_TAB);

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
  snapAlign: "center-even",
  gap: 10,
  transition: 300,
  wrapAround: false,
};

const product: Product = {
  id: 544,
  name: "Fat cat clicker",
  category: "toys",
  description: "description",
  size: {
    x: 5,
    y: 5,
    z: 12,
  },
  weight: 43,
  variants: [
    {
      id: 2,
      price: 22,
      filament: { id: 1, type: "TPU", color: "red" },
      images: [
        { url: "/img/petg-koyote.webp", type: "IMAGE" },
        { url: "/img/petg-koyote.webp", type: "IMAGE" },
        {
          url: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
          type: "IMAGE",
        },
        {
          url: "https://m.media-amazon.com/images/I/41QZSg8drOL.jpg",
          type: "IMAGE",
        },
      ],
    },
    {
      id: 3,
      price: 45,
      filament: { id: 1, type: "PETg", color: "green" },
      images: [
        {
          url: "https://as2.ftcdn.net/v2/jpg/00/66/23/39/1000_F_66233948_PZNkyexlCBb80NFf4UpS4RH7ScGC2LuI.jpg",
          type: "IMAGE",
        },
        {
          url: "https://as1.ftcdn.net/v2/jpg/05/36/96/68/1000_F_536966859_zDktu2e3QDJwactmDwYHTCVyuqJLbFZQ.webp",
          type: "IMAGE",
        },
        {
          url: "https://as2.ftcdn.net/v2/jpg/02/11/25/91/1000_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg",
          type: "IMAGE",
        },
      ],
    },
  ],
  rate: 4,
  favorite: false,
  reviews: [
    {
      id: 1,
      user: "John Doe",
      rate: 4.2,
      date: "2023-08-15",
      text: "Great product! Highly recommend.",
    },
    {
      id: 2,
      user: "Jane Smith",
      rate: 3,
      date: "2023-08-20",
      text: "Not what I expected, but still good.",
    },
  ],
  discount: 10,
};

const productImages = computed(() =>
  product.variants.map((variant) => variant.images).flat(),
);

const currentVariant = computed(() =>
  product.variants.find((el) => el.id === selectedVariantId.value),
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
</script>

<template>
  <AppContainer>
    <AppBack @click="router.go(-1)" />

    <div class="mt-8">
      <div class="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6 md:gap-10">
        <div class="">
          <div class="w-full mx-auto product-carousel">
            <!-- 
            v-model="currentSlide"
              -->
            <AppCarousel
              class="bg-gray-300 dark:bg-gray-900"
              ref="mainCarousel"
              v-bind="carouselConfig"
              @slide-end="onMainSlide"
            >
              <AppSlide
                v-for="(img, ind) in productImages"
                :key="ind"
                @click="previewImage = img"
              >
                <img
                  :src="img.url"
                  alt=""
                  class="h-full max-h-80 md:max-h-112.5 max-w-full object-contain cursor-pointer"
                />
              </AppSlide>

              <template #addons>
                <!-- <AppNavigation /> -->
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
                <!-- @click="setCurrentSlide(ind)" -->
                <img
                  :src="img.url"
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

          <ProductsRateWidget />

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
                  <div class="" :style="{ color: variant.filament.color }">
                    {{ variant.filament.color }}
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
              :badge="{ [REVIEWS_TAB]: product.reviews.length }"
              @select="currentMainTab = $event"
            >
              <div v-if="currentMainTab === SPECIFICATION_TAB" class="">
                <ol>
                  <li>Матеріал PETG</li>
                  <li>length: {{ product.size.x }}</li>
                  <li>width: {{ product.size.y }}</li>
                  <li>height: {{ product.size.z }}</li>
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
        </div>
      </div>
    </div>

    <Teleport to="#teleports">
      <AppImagePreview
        v-if="previewImage"
        :image="previewImage"
        @close="previewImage = null"
      />
    </Teleport>
  </AppContainer>
</template>
