<script setup lang="ts">
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

interface Props {
  isOpen: boolean;
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

const isMobile = computed(() => display.smAndDown.value);
const isDesktop = computed(() => display.mdAndUp.value);

const menuItems = computed(() => [
  {
    title: "Home",
    icon: "mdi-home",
    pageName: ERouteNames.homePage,
    exact: true,
  },
  {
    title: "Radobot",
    route: "radobot",
    icon: "mdi-robot-angry-outline",
    pageName: ERouteNames.radobot,
  },
  {
    title: "forgotPassword",
    route: "forgot-password",
    icon: "mdi-robot-angry-outline",
    pageName: ERouteNames.forgotPassword,
  },
]);

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

      <v-list-item link @click="handleLogout">
        <template v-slot:prepend>
          <v-icon icon="mdi-logout"></v-icon>
        </template>

        <v-list-item-title class="text-subtitle-2">Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.v-list-item__prepend > .v-icon {
  margin-inline-end: 12px;
}
.v-list--nav {
  padding-inline-start: 0;
  padding-inline-end: 0;
}
.v-list-item--nav {
  padding-inline-start: 20px;
  &:hover {
    background-color: black;
    color: white;
  }
}
.lmsdrawer {
  z-index: 1008 !important;
  //   box-shadow: none;
  height: calc(100vh - 64px) !important;
  top: 64px;
  // height: 100% !important;
  //   min-height: 520px;
  //   border-radius: 0 !important;
  //   color: #000;
  //   padding-top: 30px;
  // background: linear-gradient(179.6deg, #c2c2c2 0.35%, #8b8b8b 99.66%);
}
</style>
