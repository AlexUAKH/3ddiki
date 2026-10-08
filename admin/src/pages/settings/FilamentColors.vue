<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import ColorManageModal from "@/components/settings/ColorManageModal.vue";
import TableActions from "@/components/TableActions.vue";
import { useEditModal } from "@/composables/editModal";
import {
  useFilamentColors,
  type FilamentColorsType,
} from "@/composables/filamentColors";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { FILAMENT_COLORS_API } from "@/constants/api-const";
import {
  DELETE_ICON,
  EDIT_ICON,
  FILAMENT_COLORS_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingColor = ref<DeleteItem | null>(null);
const search = ref("");

const { t } = useI18n();
const router = useRouter();

const { colors, loading, getColors } = useFilamentColors();
const { editingId, showManageModal } = useEditModal();

const filteredColors = computed(() => {
  if (!search.value) {
    return colors.value;
  }
  return colors.value.filter((color) =>
    color.name.toLowerCase().includes(search.value.toLowerCase()),
  );
});

const headers = computed<Header[]>(() => [
  {
    title: "ID",
    key: "id",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.nameObj"),
    key: "name",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.color"),
    key: "color",
    align: "center",
    sortable: false,
  },
  {
    title: "", //t("common.action", 2),
    key: "actions",
    align: "center",
    sortable: false,
  },
]);

const actions = computed<TableAction[]>(() => [
  {
    action: EActions.edit,
    icon: EDIT_ICON,
    label: t("common.edit"),
    color: "warning",
  },
  {
    action: EActions.delete,
    icon: DELETE_ICON,
    label: t("common.delete"),
    color: "error",
  },
]);

const createHandler = () => {
  showManageModal.value = true;
};

const editHandler = (id: any) => {
  router.replace({
    name: ERouteNames.filamentColors,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeCategoryHandler = () => {
  getColors();
  closeManageModal();
};

const closeManageModal = () => {
  router.replace({
    name: ERouteNames.filamentColors,
    query: {},
  });
  showManageModal.value = false;
};

const deleteBrand = (type: FilamentColorsType) => {
  deletingColor.value = { id: type.id, name: type.name };
};

const deleteSuccessHandler = () => {
  deletingColor.value = null;
  getColors();
};

onMounted(async () => {
  loading.value = true;
  await getColors().finally(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div>
    <PageHeader
      :header="t('filamentColors.header')"
      :icon="FILAMENT_COLORS_ICON"
    >
      <template #actions>
        <!-- <div
          class="d-flex flex-column flex-md-row ga-4 align-md-center align-end"
        > -->
        <!-- <v-text-field
            v-model="search"
            append-inner-icon="mdi-magnify"
            placeholder="Search"
            hide-details
            dense
            outlined
            clearable
            clear-icon="mdi-close-circle"
            class="w-100"
            @click:clear="search = ''"
          /> -->
        <v-btn color="info" @click="createHandler">
          {{ t("common.create") }}
        </v-btn>
        <!-- </div> -->
      </template>
      <v-text-field
        v-model="search"
        append-inner-icon="mdi-magnify"
        placeholder="Search"
        hide-details
        dense
        outlined
        clearable
        clear-icon="mdi-close-circle"
        class="w-100"
        style="max-width: 500px"
        @click:clear="search = ''"
      />
    </PageHeader>

    <div class="mt-4">
      <v-card variant="outlined">
        <v-data-table
          :headers="headers"
          :items="filteredColors"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
          <template #item.color="{ item }">
            <div
              class="d-flex justify-center align-center ga-2 flex-row flex-wrap"
            >
              {{ item.color }}
              <div
                :style="{ backgroundColor: item.color }"
                style="width: 20px; height: 20px; border-radius: 50%"
              ></div>
            </div>
          </template>

          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              @delete="deleteBrand(item)"
              @edit="editHandler(item.id)"
            />
          </template>
        </v-data-table>
      </v-card>
    </div>

    <ColorManageModal
      v-if="showManageModal"
      :open="showManageModal"
      :id="editingId"
      @change="changeCategoryHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingColor"
      :open="!!deletingColor"
      :item="deletingColor"
      :url="FILAMENT_COLORS_API"
      @success="deleteSuccessHandler"
      @reject="deletingColor = null"
    />
  </div>
</template>

<style scoped></style>
