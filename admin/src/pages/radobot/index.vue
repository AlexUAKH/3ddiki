<script setup lang="ts">
import PageTitle from "@/components/common/PageTitle.vue";
import { ref } from "vue";

const imagesUrl = ref("");
const imageCount = ref(0);
const slidesNumber = ref(0);
const lessonNumber = ref(0);

async function downloadImage(url: string, filename = "image.jpg") {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Ошибка при скачивании картинки:", error);
  }
}

const formatImageName = () => {
  return String(imageCount.value).padStart(3, "0") + ".webp";
};

const downloadWebP = async () => {
  imageCount.value++;
  console.log(
    imageCount.value,
    " url: ",
    `${imagesUrl.value}/${formatImageName()}`,
  );

  try {
    // 1. Получаем данные по ссылке
    const response = await fetch(`${imagesUrl.value}/${formatImageName()}`);
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    imageCount.value++;

    // 2. Преобразуем в Blob (бинарные данные)
    const blob = await response.blob();

    // 3. Создаем временную URL-ссылку на этот Blob в памяти
    const blobUrl = URL.createObjectURL(blob);

    // 4. Создаем невидимый элемент ссылки <a>
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `lesson-${lessonNumber.value}-${imageCount.value}.webp`; // Имя файла при сохранении

    // 5. Добавляем в документ, кликаем и удаляем
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 6. Освобождаем память
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Не удалось скачать картинку:", error);
  }
};

const extractImages = async () => {
  for (let i = 0; i < slidesNumber.value; i++) {
    await downloadWebP();
  }
};
</script>

<template>
  <v-container fluid>
    <PageTitle
      header="Radobot image extractor"
      icon="mdi-robot-angry-outline"
    />

    <v-form class="mt-4">
      <div class="">Enter URL</div>
      <v-text-field
        v-model="imagesUrl"
        autocomplete="img-url"
        outlined
        dense
        class="mb-2"
      />
      <v-text-field
        v-model="lessonNumber"
        outlined
        dense
        :min="0"
        type="number"
        class="mb-4"
      />
      <v-text-field
        v-model="slidesNumber"
        outlined
        dense
        :min="0"
        type="number"
        class="mb-4"
      />
      <v-btn color="primary" class="mb-4" @click="extractImages">Extract</v-btn>
    </v-form>
  </v-container>
</template>

<style scoped></style>
