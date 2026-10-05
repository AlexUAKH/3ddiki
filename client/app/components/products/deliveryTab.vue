<script setup lang="ts"></script>

<template>
  <div>
    <ol class="pl-4 list-disc">
      <li>
        Самовивіз з нашого складу— безкоштовно. Доступно тільки після
        підтвердження замовлення нашим менеджером. Будні з 12:00 до 16:00.
      </li>
      <li>«Новою поштою» по Україні.</li>
    </ol>
    <AppLinkBtn :to="{ name: 'delivery' }" class="w-max -ml-1">
      Більше інформації про доставку
    </AppLinkBtn>
  </div>
</template>
