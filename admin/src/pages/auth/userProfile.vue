<script setup lang="ts">
import PageHeader from "@/components/common/PageHeader.vue";
import SpinnerFull from "@/components/common/SpinnerFull.vue";
import { useAuth } from "@/composables/auth";
import { type UserInfo } from "@/composables/auth.types";
import { USER_PROFILE_ICON } from "@/constants/iconsMap";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const user = ref<UserInfo>({ name: "", lastName: "" } as UserInfo);
const loading = ref(false);

const { getUserInfo } = useAuth();
const { t } = useI18n();

onMounted(async () => {
  loading.value = true;
  try {
    user.value = await getUserInfo();
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="">
    <SpinnerFull :show="loading" />

    <PageHeader :header="t('userProfile.header')" :icon="USER_PROFILE_ICON" />
    <v-form class="mt-4">
      <v-text-field label="Name" v-model="user.name"></v-text-field>
      <v-text-field label="Last name" v-model="user.lastName"></v-text-field>
    </v-form>
  </div>
</template>

<style scoped></style>
