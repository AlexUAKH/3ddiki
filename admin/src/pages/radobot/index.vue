<script setup lang="ts">
import { useRadobot } from "@/composables/radobot";
import { ref } from "vue";

const baseUrl = ref("https://lms.radooga.net/content/pz-");
const lessonNumber = ref(1);

const loading = ref(false);
const error = ref("");
const success = ref("");

const { extractImages } = useRadobot();

const downloadImages = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  const url = `${baseUrl.value}${lessonNumber.value}/`;

  try {
    const response = await extractImages(url);

    const blob = new Blob([response.data], {
      type: "application/zip",
    });

    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `lesson-${lessonNumber.value}.zip`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadUrl);

    success.value = "Archive downloaded successfully!";
  } catch (e: any) {
    // Axios may return an error response as a Blob
    if (e.response?.data instanceof Blob) {
      const text = await e.response.data.text();

      try {
        const data = JSON.parse(text);
        error.value = data.message || "Download failed";
      } catch {
        error.value = "Download failed";
      }
    } else {
      error.value = e.message || "Something went wrong";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container fluid>
    <PageHeader
      header="Radobot image extractor"
      icon="mdi-robot-angry-outline"
    />

    <v-form class="mt-4">
      <div class="">Enter URL</div>
      <v-text-field
        v-model="baseUrl"
        autocomplete="img-url"
        outlined
        dense
        class="mb-2"
      />
      <div>Lesson number</div>
      <v-text-field
        v-model="lessonNumber"
        outlined
        dense
        :min="0"
        type="number"
        class="mb-4"
      />
      <v-btn
        color="primary"
        class="mb-4"
        @click="downloadImages"
        :loading="loading"
        :disabled="loading"
      >
        Extract
      </v-btn>

      <v-alert v-if="success" :text="success" title="" type="success"></v-alert>
      <v-alert v-if="error" :text="error" title="" type="error"></v-alert>
    </v-form>
  </v-container>
</template>
