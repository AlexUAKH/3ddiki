<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const menu = ref(false);
const { locale } = useI18n();

const languages = [
  { title: "English", code: "en", shortTitle: "En" },
  { title: "Українська", code: "uk", shortTitle: "Укр" },
];

const currentLanguage = computed(
  () =>
    languages.find((language) => language.code === locale.value) ||
    languages[0],
);

const changeLanguage = (code: string) => {
  locale.value = code;
  localStorage.setItem("language_code", code);
  menu.value = false;
};
</script>

<template>
  <v-menu v-model="menu" location="bottom end" offset="4" viewport-margin="0">
    <template v-slot:activator="{ props }">
      <v-btn icon color="primary" v-bind="props">
        <v-img
          :width="40"
          aspect-ratio="1/1"
          class="max-w-8 w-10"
          :src="`/img/${currentLanguage.code}_flag.png`"
        ></v-img>
        <!-- <v-icon icon="mdi-chevron-down"></v-icon> -->
      </v-btn>
    </template>

    <v-list class="py-1" density="compact" rounded="lg" border>
      <v-list-item
        v-for="language in languages"
        :key="language.code"
        :title="language.title"
        :active="language.code === locale"
        @click="changeLanguage(language.code)"
      />
    </v-list>
  </v-menu>
</template>

<style scoped></style>
