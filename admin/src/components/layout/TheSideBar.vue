<script setup lang="ts">
import {
  CUSTOMERS_ICON,
  DASHBOARD_ICON,
  FILAMENT_BRANDS_ICON,
  FILAMENT_COLORS_ICON,
  FILAMENT_TYPES_ICON,
  FILAMENTS_ICON,
  PRODUCT_CATEGORIES_ICON,
  PRODUCTS_ICON,
} from "@/constants/iconsMap";
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

interface Props {
  isOpen: boolean;
}
interface MenuItem {
  title: string;
  icon: string;
  route: string;
  pageName: ERouteNames;
  exact?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emits = defineEmits(["toggle"]);

const drawer = computed({
  get: () => {
    return props.isOpen || isDesktop.value;
  },
  set: (val: boolean) => {
    emits("toggle", val);
  },
});
const display = useDisplay();
const authStore = useAuthStore();
const { logout } = authStore;

const route = useRoute();
const { t } = useI18n();

const isMobile = computed(() => display.smAndDown.value);
const isDesktop = computed(() => display.mdAndUp.value);

const menuItems = computed<MenuItem[]>(() => [
  {
    title: t("sideBar.dashboard"),
    icon: DASHBOARD_ICON,
    route: "",
    pageName: ERouteNames.homePage,
    exact: true,
  },
  {
    title: t("sideBar.customers"),
    icon: CUSTOMERS_ICON,
    route: "customers",
    pageName: ERouteNames.customers,
  },
  {
    title: t("sideBar.filaments"),
    icon: FILAMENTS_ICON,
    route: "filaments",
    pageName: ERouteNames.filaments,
  },
  {
    title: t("sideBar.products"),
    icon: PRODUCTS_ICON,
    route: "products",
    pageName: ERouteNames.products,
  },
  // {
  //   title: "Radobot",
  //   route: "radobot",
  //   icon: "mdi-robot-angry-outline",
  //   pageName: ERouteNames.radobot,
  // },
]);

const settings = [
  [
    "sideBar.productCategories",
    PRODUCT_CATEGORIES_ICON,
    ERouteNames.productCategories,
  ],
  ["sideBar.filamentTypes", FILAMENT_TYPES_ICON, ERouteNames.filamentTypes],
  ["sideBar.filamentBrands", FILAMENT_BRANDS_ICON, ERouteNames.filamentBrands],
  ["sideBar.filamentColors", FILAMENT_COLORS_ICON, ERouteNames.filamentColors],
];

const handleLogout = () => {
  logout().then(() => {
    location.reload();
  });
};
</script>

<template>
  <v-navigation-drawer
    location="left"
    :temporary="isMobile"
    :permanent="isDesktop"
    v-model="drawer"
    :width="220"
    class="lmsdrawer"
    fixed
    :border="0"
    app
  >
    <v-list lines="one" density="compact" nav>
      <template v-for="item in menuItems" :key="item.title">
        <v-list-item
          :to="{ name: item.pageName }"
          color="black"
          :exact="item.exact"
          :active="item.route ? route.fullPath.includes(item.route) : undefined"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title
            v-text="item.title"
            class="text-subtitle-2"
          ></v-list-item-title>
        </v-list-item>
      </template>

      <v-list-group value="settings">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="t('sideBar.settings')"
            prepend-icon="mdi-cog-outline"
          ></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon, pageName], i) in settings"
          :key="i"
          :prepend-icon="icon"
          :title="t(title)"
          :value="title"
          :to="{ name: pageName }"
        ></v-list-item>
      </v-list-group>

      <!-- <v-list-item link @click="handleLogout">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>

        <v-list-item-title class="text-subtitle-2">Logout</v-list-item-title>
      </v-list-item> -->
    </v-list>

    <template v-slot:append>
      <div class="py-2 px-3">
        <v-btn block @click="handleLogout" append-icon="mdi-logout">
          {{ t("header.logout") }}
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.lmsdrawer {
  height: calc(100vh - 64px) !important;
  top: 64px;
  padding-top: 30px;
}
</style>
