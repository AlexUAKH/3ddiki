<script setup lang="ts">
import { useHelpers } from "@/composables/helpers";
import $http from "@/plugins/axios";
import type { DeleteItem } from "@/types";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import FormActions from "./common/FormActions.vue";

const props = defineProps<{
  open: boolean;
  item: DeleteItem;
  url: string;
}>();
const emits = defineEmits(["success", "reject"]);

const { errorMessage } = useHelpers();

const deleting = ref(false);

const deleteItem = async () => {
  if (!props.item.id) {
    toast.error({
      title: "Error",
      description: "You mast provide item ID",
      color: "error",
    });

    return;
  }

  deleting.value = true;

  try {
    await $http.delete(`${props.url}/${props.item.id}`);

    toast.success({
      title: "Success",
      description: `${props.item.name || "Item"} was deleted successfully`,
      color: "success",
    });

    emits("success");
  } catch (error) {
    toast.error({
      title: "Error",
      description: errorMessage(error),
      color: "error",
    });
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <v-dialog overlay :model-value="open">
    <v-card>
      <div class="text-center">
        <h2 class="text-error text-3xl font-bold">Warning!</h2>
        <p class="mt-6 text-xl">
          Are you sure you want to delete {{ props.item.name || "this item" }}?
        </p>
      </div>
      <div class="mt-6 flex justify-center gap-4">
        <FormActions @confirm="deleteItem" @reject="$emit('reject')" />
      </div>
    </v-card>
  </v-dialog>
</template>
