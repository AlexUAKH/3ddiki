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
    <Container class="h-14 md:h-20 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Icon name="mdi:menu" class="md:hidden size-6" />
        <TheLogo />
      </div>
      <div class=""></div>
      <div class="flex items-center gap-4 md:gap-8">
        <ColorModeSelect />
        <UserProfileWidget />
        <ShoppingCartWidget />
      </div>
    </Container>
  </header>
</template>
