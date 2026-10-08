import router from "@/router";
import type { ERouteNames } from "@/router/router.types";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export const useEditModal = (routeName?: ERouteNames) => {
  const showManageModal = ref(false);

  const route = useRoute();
  const editingId = computed(() => route.query.edit?.toString() || undefined);

  const createHandler = () => {
    showManageModal.value = true;
  };

  const editHandler = (id: any) => {
    router.replace({
      name: routeName || "",
      query: { edit: id },
    });
    showManageModal.value = true;
  };

  const closeManageModal = () => {
    router.replace({
      name: routeName || "",
      query: {},
    });
    showManageModal.value = false;
  };

  onMounted(() => {
    if (editingId.value) {
      showManageModal.value = true;
    }
  });

  return {
    editingId,
    showManageModal,
    createHandler,
    editHandler,
    closeManageModal,
  };
};
