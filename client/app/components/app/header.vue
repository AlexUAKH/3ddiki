<script setup lang="ts">
import {
  CONTACTS_PAGE,
  DELIVERY_PAGE,
  REVIEWS_PAGE,
} from "~/constants/routeNames.ts";

// Про нас
// Оплата і доставка
// Обмін та повернення
// Контактна інформація
// Ще
// +380935239383

// Каталог
// Про нас
// Оплата і доставка
// Обмін та повернення
// Контактна інформація
// Блог
// Ще
// Графік роботи:
// Пн-чт: 08:00–17:00 Пт: 08:00–16:00
// Укр
// Рус

const mobileMenu = ref(false);
const { t } = useI18n();

const mainMenuItems = computed(() => [
  { title: "", to: "" },
  { title: t("delivery.header"), to: DELIVERY_PAGE },
  { title: "Контакти", to: CONTACTS_PAGE },
  { title: "", to: "" },
  { title: "Відгуки", to: REVIEWS_PAGE },
]);
</script>

<template>
  <header class="sticky shadow-gray-400 shadow-md">
    <div class=""></div>
    <AppContainer class="h-14 md:h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <AppButton @click="mobileMenu = !mobileMenu">
          <Icon name="mdi:menu" class="md:hidden size-6" />
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

    <Transition name="slide-fade">
      <MobileMenu
        v-if="mobileMenu"
        :items="mainMenuItems"
        @close="mobileMenu = false"
      />
    </Transition>
  </header>
</template>

<style lang="css" scoped>
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
