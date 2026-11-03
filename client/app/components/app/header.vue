<script setup lang="ts">
import {
  CONTACTS_PAGE,
  DELIVERY_PAGE,
  PRODUCTS_PAGE,
  REVIEWS_PAGE,
} from "~/constants/routeNames.ts";

const mobileMenu = ref(false);
const { t } = useI18n();

const mainMenuItems = computed(() => [
  { title: t("products.menu"), to: PRODUCTS_PAGE },
  { title: t("delivery.header"), to: DELIVERY_PAGE },
  { title: t("contacts.header"), to: CONTACTS_PAGE },
  { title: t("reviews.header"), to: REVIEWS_PAGE },
]);
</script>

<template>
  <header class="sticky top-0 shadow-gray-400 shadow-md z-1 bg-app">
    <div class=""></div>
    <AppContainer class="h-14 md:h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <AppButton @click="mobileMenu = !mobileMenu" class="md:hidden">
          <Icon name="mdi:menu" class="size-6" />
        </AppButton>
        <NuxtLink to="/">
          <AppLogo />
        </NuxtLink>
      </div>
      <div class="hidden md:block">
        <MainMenu :items="mainMenuItems" />
      </div>
      <div class="flex items-center gap-2 md:gap-8">
        <AppColorModeSelect />
        <AppLanguageSelect />
        <UserProfileWidget />
        <ShoppingCartWidget />
      </div>
    </AppContainer>

    <Teleport to="#teleports">
      <Transition name="slide-fade">
        <MobileMenu
          v-if="mobileMenu"
          :items="mainMenuItems"
          @close="mobileMenu = false"
        />
      </Transition>
    </Teleport>
  </header>
</template>

<style lang="css" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
