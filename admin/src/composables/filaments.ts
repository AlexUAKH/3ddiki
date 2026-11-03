import { FILAMENT_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type FilamentType = {
  id: number;
  name: string;
  colors: string[];
  type: string;
  brand: string;
  price: number;
  stock: number;
};

export const useFilaments = () => {
  const filaments = ref<FilamentType[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getFilaments = async () => {
    loading.value = true;
    try {
      const res = await $http.get(FILAMENT_API);
      filaments.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      loading.value = false;
    }
  };

  return {
    filaments,
    loading,
    getFilaments,
  };
};
