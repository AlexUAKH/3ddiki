import { PRODUCT_CATEGORY_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type ProductCategoryType = {
  id: number;
  name: string;
};

export const useProductCategories = () => {
  const categories = ref<ProductCategoryType[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getCategories = async () => {
    loading.value = true;
    try {
      const res = await $http.get(PRODUCT_CATEGORY_API);
      categories.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    getCategories,
  };
};
