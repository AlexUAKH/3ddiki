import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export const useEditModal = () => {
  const showManageModal = ref(false);

  const route = useRoute();
  const editingId = computed(() => route.query.edit?.toString() || undefined);

  onMounted(() => {
    if (editingId.value) {
      showManageModal.value = true;
    }
  });

  return {
    editingId,
    showManageModal,
  };
};
