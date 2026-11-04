import { ORDER_API } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useHelpers } from "./helpers";

export type OrderListItem = {
  id: number;
  user: string;
  status: string;
  total: number;
  date: string;
};

export type OrderDetails = {
  id: number;
};

export type MakeOrder = {};

export type UpdateOrder = {};

export const useOrders = () => {
  const orders = ref<OrderListItem[]>([]);
  const loading = ref(false);

  const { errorMessage } = useHelpers();

  const getOrders = async () => {
    loading.value = true;
    try {
      const res = await $http.get(ORDER_API);
      orders.value = res.data;
    } catch (e) {
      toast.error(errorMessage(e));
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const getOrder = (id: number) => {
    return $http.get(ORDER_API + "/" + id);
  };

  const makeOrder = (data: MakeOrder) => {
    return $http.post(ORDER_API, data);
  };

  const updateOrder = (id: number, data: UpdateOrder) => {
    return $http.patch(`${ORDER_API}/${id}`, data);
  };

  return {
    orders,
    loading,
    getOrder,
    getOrders,
    makeOrder,
    updateOrder,
  };
};
