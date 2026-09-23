<script setup>
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return locales.value
    .filter((i) => i.code !== locale.value)
    .map((language) => ({
      title: language.name,
      to: language.code,
    }));
});
</script>

<template>
  <AppMenu :items="availableLocales">
    <AppButton class="uppercase">
      {{ locale }}
    </AppButton>

    <template #item="{ item }">
      <AppButton class="px-4" block @click="setLocale(item.to)">
        {{ item.title }}
      </AppButton>
    </template>
  </AppMenu>
</template>
