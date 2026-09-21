import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export type SortByType = {
  key: string;
  order: string;
};

export enum EActions {
  edit = "edit",
  delete = "delete",
}

export type Header = {
  readonly key: string;
  readonly title: string;
  readonly align?: "end" | "start" | "center" | undefined;
  readonly width?: string | number | undefined;
  readonly minWidth?: string | number | undefined;
  readonly maxWidth?: string | number | undefined;
  readonly fixed?: boolean | "end" | "start" | undefined;
  readonly nowrap?: boolean | undefined;
  readonly indent?: number | undefined;
  readonly sortable?: boolean | undefined;
};

export type TableAction = {
  action: EActions;
  label: string;
  color?: string;
  icon?: string;
};

export const useTable = () => {
  const page = ref(1);
  const itemsPerPage = ref(10);
  const loading = ref(false);
  const total = ref(0);
  const options = ref({});
  const sortBy = ref<SortByType[]>([]);

  const router = useRouter();

  watch(
    () => options.value,
    (val: any) => {
      itemsPerPage.value = val.itemsPerPage;
      page.value = val.page;
      sortBy.value = val.sortBy;
    },
  );

  const viewEntry = (id: number, routeName: string) => {
    router.push({
      name: routeName,
      params: {
        id,
      },
    });
  };

  const editEntry = (id: number, routeName: string) => {
    router.push({
      name: routeName,
      params: {
        id,
      },
    });
  };

  // const onDelete = async (id: number, routeName: string) => {
  //     try {
  //       await removeCompany(id.toString());
  //       page.value = 1;
  //       toast.success("Company was deleted");
  //     } catch (e: any) {
  //       toast.error(e.errors);
  //     }
  //   }

  return {
    page,
    itemsPerPage,
    loading,
    total,
    options,
    sortBy,

    editEntry,
    viewEntry,
  };
};
