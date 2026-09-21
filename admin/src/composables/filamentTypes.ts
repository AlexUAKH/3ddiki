import { FILAMENT_TYPES_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type FilamentTypesType = {
  id: number;
  name: string;
};

export const useFilamentTypes = () => {
  const types = ref<FilamentTypesType[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getTypes = async () => {
    loading.value = true;
    try {
      const res = await $http.get(FILAMENT_TYPES_API);
      types.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      loading.value = false;
    }
  };

  return {
    types,
    loading,
    getTypes,
  };
};
