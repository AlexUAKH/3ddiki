<script setup lang="ts">
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const authStore = useAuthStore();
const { logout } = authStore;
const { user } = storeToRefs(authStore);
const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const menu = ref(false);

const openUserProfile = () => {
  if (route.name === ERouteNames.userProfile) return;
  router.push({ name: ERouteNames.userProfile });
};

const handleLogout = () => {
  logout().then((e) => {
    location.reload();
  });
};
</script>

<template>
  <v-menu v-model="menu" location="bottom end" offset="4" viewport-margin="0">
    <template v-slot:activator="{ props }">
      <v-btn :icon="!mdAndUp" v-bind="props">
        <span class="hidden md:inline-block">{{ user.email }}</span>
        <v-icon class="ml-0 md:ml-2" size="x-large">mdi-account-circle</v-icon>
      </v-btn>
    </template>

    <v-list class="py-1" density="compact" rounded="lg" border>
      <v-list-item
        :title="t('header.userProfile')"
        :active="route.name === ERouteNames.userProfile"
        @click="openUserProfile"
      />
      <v-list-item
        :title="t('header.logout')"
        @click="handleLogout"
        append-icon="mdi-logout"
      >
        <!-- <v-icon icon="mdi-logout"></v-icon> -->
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped></style>
