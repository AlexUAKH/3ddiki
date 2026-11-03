<script setup lang="ts">
import { PRODUCTS_API } from "~/constants/api";
import type { ProductListItem } from "~/types";

interface IndexProps {}

defineProps<IndexProps>();

const { t } = useI18n();

useHead({
  title: t("products.menu"),
});

// const products: ProductListItem[] = [
//   {
//     id: 4,
//     name: "qwerty вічіпромер",
//     category: "Keychain",
//     price: 55.8,
//     discount: 0,
//     rate: 4,
//     images: [
//       {
//         url: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://m.media-amazon.com/images/I/41QZSg8drOL.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/00/66/23/39/1000_F_66233948_PZNkyexlCBb80NFf4UpS4RH7ScGC2LuI.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as1.ftcdn.net/v2/jpg/05/36/96/68/1000_F_536966859_zDktu2e3QDJwactmDwYHTCVyuqJLbFZQ.webp",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/02/11/25/91/1000_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg",
//         type: "IMAGE",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "qwerty вічіпромер",
//     category: "Keychain",
//     price: 55.8,
//     discount: 0,
//     rate: 4,
//     images: [
//       {
//         url: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://m.media-amazon.com/images/I/41QZSg8drOL.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/00/66/23/39/1000_F_66233948_PZNkyexlCBb80NFf4UpS4RH7ScGC2LuI.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as1.ftcdn.net/v2/jpg/05/36/96/68/1000_F_536966859_zDktu2e3QDJwactmDwYHTCVyuqJLbFZQ.webp",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/02/11/25/91/1000_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg",
//         type: "IMAGE",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "qwerty вічіпромер",
//     category: "Keychain",
//     price: 60,
//     discount: 10,
//     rate: 4,
//     images: [
//       {
//         url: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://m.media-amazon.com/images/I/41QZSg8drOL.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/00/66/23/39/1000_F_66233948_PZNkyexlCBb80NFf4UpS4RH7ScGC2LuI.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as1.ftcdn.net/v2/jpg/05/36/96/68/1000_F_536966859_zDktu2e3QDJwactmDwYHTCVyuqJLbFZQ.webp",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/02/11/25/91/1000_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg",
//         type: "IMAGE",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "qwerty вічіпромер",
//     category: "Keychain",
//     price: 55.8,
//     discount: 0,
//     rate: 4,
//     images: [
//       {
//         url: "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://m.media-amazon.com/images/I/41QZSg8drOL.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/00/66/23/39/1000_F_66233948_PZNkyexlCBb80NFf4UpS4RH7ScGC2LuI.jpg",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as1.ftcdn.net/v2/jpg/05/36/96/68/1000_F_536966859_zDktu2e3QDJwactmDwYHTCVyuqJLbFZQ.webp",
//         type: "IMAGE",
//       },
//       {
//         url: "https://as2.ftcdn.net/v2/jpg/02/11/25/91/1000_F_211259199_n0LBMIpx3FGIsKjqQHt7g8u3pjH2i9OL.jpg",
//         type: "IMAGE",
//       },
//     ],
//   },
// ];

const {
  data: products,
  pending,
  refresh,
} = await useAsyncApi<ProductListItem[]>(PRODUCTS_API, {
  key: "products",
  method: "GET",
  default: () => [],
});
</script>

<template>
  <AppContainer class="pt-4">
    <!-- <ProductsFilters /> -->
    <ProductsList :products="products" :pending="pending" />
  </AppContainer>
</template>
