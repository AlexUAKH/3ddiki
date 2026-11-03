import { FILAMENT_COLORS_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type FilamentColorsType = {
  id: number;
  name: string;
  color: string;
};

export const useFilamentColors = () => {
  const colors = ref<FilamentColorsType[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getColors = async () => {
    loading.value = true;
    try {
      const res = await $http.get(FILAMENT_COLORS_API);
      colors.value = res.data;
      console.log("getColors: ", res);
    } catch (e) {
      toast.error(errorMessage(e));
    } finally {
      loading.value = false;
    }
  };

  return {
    colors,
    loading,
    getColors,
  };
};
