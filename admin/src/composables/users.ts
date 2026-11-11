import {
  CUSTOMERS_ROLES_API_FOR_SELECT,
  USERS_API,
} from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import type { EUserRoles } from "./auth.types";
import { useHelpers } from "./helpers";

export type Role = keyof typeof EUserRoles;

export type User = {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  isEmailVerified: boolean;
  // stripeCustomerId: string;
  createdAt: string;
};

export type CreateUser = Omit<User, "id" | "createdAt">;

export type UpdateUser = Partial<CreateUser>;

export const useUsers = () => {
  const users = ref<User[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getUsers = async () => {
    loading.value = true;
    try {
      const res = await $http.get(USERS_API);
      users.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getUserRoles = () => {
    return $http.get(CUSTOMERS_ROLES_API_FOR_SELECT);
  };

  const getUser = (id: StringConstructor) => {
    return $http.get(USERS_API + "/" + id);
  };

  const createUser = (data: CreateUser) => {
    return $http.post(USERS_API, data);
  };

  const updateUser = (id: string, data: UpdateUser) => {
    return $http.patch(`${USERS_API}/${id}`, data);
  };

  return {
    users,
    loading,
    getUser,
    getUsers,
    createUser,
    updateUser,
    getUserRoles,
  };
};
