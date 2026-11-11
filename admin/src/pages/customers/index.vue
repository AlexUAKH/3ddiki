<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import DeleteItemModal from "@/components/DeleteItemModal.vue";
import TableActions from "@/components/TableActions.vue";
import ManageModal from "@/components/user/ManageModal.vue";
import { useAuth } from "@/composables/auth";
import { useEditModal } from "@/composables/editModal";
import { useHelpers } from "@/composables/helpers";
import { EActions, type Header, type TableAction } from "@/composables/table";
import { useUsers, type Role, type User } from "@/composables/users";
import { USERS_API } from "@/constants/api-const";
import {
  CUSTOMERS_ICON,
  DELETE_ICON,
  EDIT_ICON,
  EMAIL_SYNC_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import type { DeleteItem } from "@/types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const deletingUser = ref<DeleteItem | null>(null);
const searchByEmail = ref<string>("");
const searchByRole = ref<Role>("ALL");
const roles = ref<Role[]>([]);
const sending = ref("");

const { t } = useI18n();
const { users, loading, getUsers, getUserRoles } = useUsers();
const router = useRouter();
const { formateDate, errorMessage } = useHelpers();
const { editingId, showManageModal } = useEditModal();
const { resendVerificationEmail: resendEmail } = useAuth();

const headers = computed<Header[]>(() => [
  // {
  //   title: "ID",
  //   key: "id",
  //   align: "center",
  //   sortable: false,
  // },
  {
    title: t("customers.name"),
    key: "name",
    align: "center",
    sortable: false,
  },
  {
    title: t("customers.email"),
    key: "email",
    align: "center",
    sortable: false,
  },
  {
    title: t("customers.role"),
    key: "role",
    align: "center",
    sortable: false,
  },
  {
    title: t("customers.isEmailVerified"),
    key: "isEmailVerified",
    align: "center",
    sortable: false,
  },
  {
    title: t("customers.createdAt"),
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
    action: EActions.sendVerificationEmail,
    icon: EMAIL_SYNC_ICON,
    label: t("auth.resendVerificationEmail"),
    color: "info",
  },
  {
    action: EActions.delete,
    icon: DELETE_ICON,
    label: t("common.delete"),
    color: "error",
  },
]);

const filteredUsers = computed(() =>
  users.value.filter((user) => {
    return (
      (searchByRole.value && searchByRole.value !== "ALL"
        ? user.role === searchByRole.value
        : true) &&
      (searchByEmail.value ? user.email === searchByEmail.value : true)
    );
  }),
);

const rolesForFilter = computed(() => ["ALL", ...roles.value]);

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

const resendVerificationEmail = async (email: string) => {
  sending.value = email;
  try {
    await resendEmail(email);

    toast.success(t("auth.verificationEmail"));
  } catch (error: any) {
    toast.error(errorMessage(error));
  } finally {
    sending.value = "";
  }
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
          :items="rolesForFilter"
          dense
          hide-details
          style="max-width: 200px"
          :placeholder="t('customers.role')"
          @click:clear="searchByRole = 'ALL'"
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
          :items="filteredUsers"
          :loading="loading"
          :no-data-text="t('common.noData')"
        >
          <template #item.isEmailVerified="{ item }">
            <div class="">
              {{ item.isEmailVerified ? t("common.yes") : t("common.no") }}
            </div>
          </template>
          <template #item.createdAt="{ item }">
            <div class="">
              {{ formateDate(item.createdAt, true) }}
            </div>
          </template>
          <template #item.actions="{ item }">
            <TableActions
              :actions="actions"
              :loading="
                sending === item.email ? EActions.sendVerificationEmail : ''
              "
              :disabled="{
                [EActions.sendVerificationEmail]: item.isEmailVerified,
              }"
              @delete="deleteUser(item)"
              @edit="editHandler(item.id)"
              @sendVerificationEmail="resendVerificationEmail(item.email)"
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
