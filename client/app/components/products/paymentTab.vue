<script setup lang="ts"></script>

<template>
  <div>
    <ol class="pl-4 list-disc">
      <li>Онлайн оплата</li>
      <li>Переказ на реквізити</li>
    </ol>
    <AppLinkBtn :to="{ name: 'delivery' }" class="w-max -ml-1">
      Детальніше про оплату
    </AppLinkBtn>
  </div>
</template>
