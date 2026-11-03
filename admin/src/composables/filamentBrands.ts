import { FILAMENT_BRANDS_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type FilamentBrandsType = {
  id: number;
  name: string;
};

export const useFilamentBrands = () => {
  const brands = ref<FilamentBrandsType[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getBrands = async () => {
    loading.value = true;
    try {
      const res = await $http.get(FILAMENT_BRANDS_API);
      brands.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      loading.value = false;
    }
  };

  return {
    brands,
    loading,
    getBrands,
  };
};
