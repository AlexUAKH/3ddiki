<script setup lang="ts">
import type { ProductListItem } from "~/types";

interface ProductListProps {
  products: ProductListItem[];
  pending: boolean;
}

const props = defineProps<ProductListProps>();

const router = useRouter();

const openProduct = (id: number) => {
  router.push(`/products/${id}`);
};
watchEffect(() => {
  console.log("products: ", props.products);
});
</script>

<template>
  <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <SkeletonProductListCard v-if="pending" v-for="i in 3" />

    <div v-else-if="!products?.length" class="">Ще немає продуктів</div>
    <ProductsCard
      v-else
      v-for="product in products"
      :product="product"
      @select="openProduct(product.id)"
    />
  </div>
</template>
