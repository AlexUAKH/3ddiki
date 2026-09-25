<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

interface ListProps {}

type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT";

type MediaFile = {
  url: string;
  type: MediaType;
};

type ProductListItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  rate: number;
  images: MediaFile[];
};
defineProps<ListProps>();

const swiperContainerRefs = ref<HTMLElement[]>([]);

const swiperOptions = {
  effect: "creative",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
};

onMounted(async () => {
  await customElements.whenDefined("swiper-container");
  await nextTick();

  swiperContainerRefs.value.forEach((container) => {
    Object.assign(container, swiperOptions);
    container.initialize();
  });
});

const products: ProductListItem[] = [
  {
    id: 4,
    name: "qwerty",
    category: "Keychain",
    price: 55.8,
    discount: 0,
    rate: 4,
    images: [
      {
        url: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
        type: "IMAGE",
      },
      {
        url: "https://m.media-amazon.com/images/I/41QZSg8drOL.jpg",
        type: "IMAGE",
      },
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
];
</script>

<template>
  <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <AppCard v-for="product in products" class="">
      <ClientOnly>
        <swiper-container ref="swiperContainerRefs" :init="false">
          <swiper-slide v-for="(img, idx) in product.images" :key="idx">
            Slide {{ idx + 1 }} {{ img }}
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
      <div class="">{{ product.name }}</div>
      <div class="">{{ product.category }}</div>
      <div class="">{{ product.price }}</div>
    </AppCard>
  </div>
</template>
