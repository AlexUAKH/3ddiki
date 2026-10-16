import { PRODUCT_API, PRODUCT_VARIANT_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT";
export type MediaFile = {
  url: string;
  type: MediaType;
};
export type ProductVariant = {
  id: number;
  productId: number;
  filamentId: number;
  price: number;
  stock: number;
  files: MediaFile[];
};
export type Review = {
  id: number;
  user: string;
  product: string;
  rate: number;
  date: string;
  text: string;
};
export type ProductType = {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  weight: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  variants: ProductVariant[];
  rate: number;
  favorite: boolean;
  reviews: Review[];
  discount: number;
};
export type ProductListItem = Omit<
  ProductType,
  "description" | "variants" | "rate" | "favorite" | "reviews" | "categoryId"
> & {
  category: { id: number; title: string };
};
export type CreateProductVariant = Omit<ProductVariant, "id">;
export type CreateProduct = {
  name: string;
  categoryId: number;
  description: string;
  weight: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  discount: number;
};
export type UpdateProduct = CreateProduct;

export const useProducts = () => {
  const products = ref<ProductListItem[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getProducts = async () => {
    loading.value = true;
    try {
      const res = await $http.get(PRODUCT_API);
      products.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getProduct = (id: number) => {
    return $http.get(PRODUCT_API + "/" + id);
  };

  const createProduct = (data: CreateProduct) => {
    return $http.post(PRODUCT_API, data);
  };

  const updateProduct = (id: number | string, data: UpdateProduct) => {
    return $http.patch(`${PRODUCT_API}/${id}`, data);
  };

  const changeProductDiscount = (id: number, data: { discount: number }) => {
    return $http.patch(`${PRODUCT_API}/${id}/change-discount`, data);
  };

  const getProductVariants = () => {
    return $http.get(PRODUCT_VARIANT_API);
  };

  const getProductVariant = (id: number) => {
    return $http.get(PRODUCT_VARIANT_API + "/" + id);
  };

  const createProductVariant = (data: CreateProductVariant) => {
    return $http.patch(PRODUCT_VARIANT_API, data);
  };

  const updateProductVariant = (id: number, data: CreateProductVariant) => {
    return $http.patch(`${PRODUCT_VARIANT_API}/${id}`, data);
  };

  return {
    products,
    loading,
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    changeProductDiscount,
    getProductVariant,
    getProductVariants,
    createProductVariant,
    updateProductVariant,
  };
};
