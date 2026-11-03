<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: t("contacts.header"),
});
</script>

<template>
  <AppContainer class="mt-6 p-4 text-lg">
    <h2 class="text-3xl md:text-5xl mb-5">{{ t("contacts.header") }}</h2>
    <ol class="space-y-4">
      <li class="flex items-center gap-2">
        <Icon name="mdi:email-edit-outline" />
        <a class="block" href="mailTo:3ddiki@gmail.com">3ddiki@gmail.com</a>
      </li>
      <abbr class="flex items-center gap-2">
        <Icon name="mdi:phone" />
        <a class="block" href="tel:+380995554433">+380995554433</a>
      </abbr>
      <abbr class="flex items-center gap-2">
        <Icon name="mdi:instagram" />
        <a
          class="block"
          href="https://www.instagram.com/3ddiki?igsh=MW53YTh6dXYxaHk5Mw%3D%3D&utm_source=qr"
          target="_blank"
          >3ddiki If</a
        >
      </abbr>
    </ol>
    <p class="mt-4">
      Всі замовлення, дзвінки та повідомлення оформлюються в робочий час.
    </p>
    <p class="mt-2">Графік роботи інтернет-магазину:</p>
    <p>Пн-чт: 10:00 - 17:00</p>
    <p>Пт: 10:00 - 16:00</p>
  </AppContainer>
</template>
