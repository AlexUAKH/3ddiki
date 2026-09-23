<script setup lang="ts">
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
</script>

<template>
  <header class="sticky shadow-gray-400 shadow-md">
    <div class=""></div>
    <AppContainer class="h-14 md:h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Icon name="mdi:menu" class="md:hidden size-6" />
        <AppLogo />
      </div>
      <div class=""></div>
      <div class="flex items-center gap-2 md:gap-8">
        <AppColorModeSelect />
        <AppLanguageSelect />
        <UserProfileWidget />
        <ShoppingCartWidget />
      </div>
    </AppContainer>
  </header>
</template>
