<script setup lang="ts">
import type { ProductListItem } from "~/types";

interface ProductListProps {
  products: ProductListItem[];
}

defineProps<ProductListProps>();

const router = useRouter();

const openProduct = (id: number) => {
  router.push(`/products/${id}`);
};
</script>

<template>
  <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <ProductsCard
      v-for="product in products"
      :product="product"
      @select="openProduct(product.id)"
    />
  </div>
</template>
