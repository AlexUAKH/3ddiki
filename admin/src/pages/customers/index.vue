<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import TableActions from "@/components/TableActions.vue";
import ManageModal from "@/components/user/ManageModal.vue";
import { useEditModal } from "@/composables/editModal";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { useUsers, type Role, type User } from "@/composables/users";
import { USERS_API } from "@/constants/api-const";
import { CUSTOMERS_ICON, DELETE_ICON, EDIT_ICON } from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const deletingUser = ref<DeleteItem | null>(null);
const searchByEmail = ref<string>("");
const searchByRole = ref<Role>();
const roles = ref<Role[]>([]);

const { t } = useI18n();
const { users, loading, getUsers, getUserRoles } = useUsers();
const router = useRouter();
const { editingId, showManageModal } = useEditModal();

const headers = computed<Header[]>(() => [
  {
    title: "ID",
    key: "id",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.name"),
    key: "name",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.email"),
    key: "email",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.role"),
    key: "role",
    align: "center",
    sortable: false,
  },
  {
    title: t("common.createdAt"),
    key: "createdAt",
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

const editHandler = (id: string) => {
  router.replace({
    name: ERouteNames.customers,
    query: { edit: id },
  });
  showManageModal.value = true;
};

const changeUserHandler = () => {
  getUsers();
  closeManageModal();
};

const deleteUser = (user: User) => {
  deletingUser.value = { id: user.id, name: user.name };
};

const deleteSuccessHandler = () => {
  deletingUser.value = null;
  getUsers();
};

const closeManageModal = () => {
  router.replace({
    name: ERouteNames.customers,
    query: {},
  });
  showManageModal.value = false;
};

onMounted(async () => {
  loading.value = true;

  const res = await Promise.all([getUserRoles(), getUsers()]).finally(() => {
    loading.value = false;
  });

  roles.value = res[0].data || [];
});
</script>

<template>
  <div>
    <PageHeader :header="t('customers.header')" :icon="CUSTOMERS_ICON">
      <div class="w-100 d-flex flex-wrap ga-2 align-center">
        <v-text-field
          v-model="searchByEmail"
          append-inner-icon="mdi-magnify"
          :placeholder="t('customers.email')"
          hide-details
          dense
          clearable
          clear-icon="mdi-close-circle"
          style="max-width: 500px"
          @click:clear="searchByEmail = ''"
        />
        <v-autocomplete
          v-model="searchByRole"
          :items="roles"
          dense
          hide-details
          style="max-width: 200px"
          :placeholder="t('customers.role')"
          @click:clear="searchByRole = undefined"
        />
      </div>

      <template #actions>
        <v-btn color="info" @click="createHandler">
          {{ t("common.create") }}
        </v-btn>
      </template>
    </PageHeader>

    <div class="mt-4">
      <v-card variant="outlined">
        <v-data-table
          striped="even"
          :headers="headers"
          :items="users"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              @delete="deleteUser(item)"
              @edit="editHandler(item.id)"
            />
          </template>
        </v-data-table>
      </v-card>
    </div>

    <ManageModal
      v-if="showManageModal"
      :open="showManageModal"
      :id="editingId"
      :roles="roles"
      @change="changeUserHandler"
      @close="closeManageModal"
    />

    <DeleteItemModal
      v-if="deletingUser"
      :open="!!deletingUser"
      :item="deletingUser"
      :url="USERS_API"
      @success="deleteSuccessHandler"
      @reject="deletingUser = null"
    />
  </div>
</template>

<style scoped></style>
