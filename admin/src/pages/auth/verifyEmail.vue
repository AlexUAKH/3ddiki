<script setup lang="ts">
import { AUTH_VERIFY_EMAIL } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ERouteNames } from "@/router/router.types";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useRoute } from "vuetify/lib/composables/router.mjs";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const status = ref(t("auth.verifyingYourEmail"));
const error = ref(false);

const goToLogin = () => {
  router.replace({ name: ERouteNames.login });
};

onMounted(async () => {
  const token = route.value?.query.token || "";

  if (typeof token !== "string" || !token) {
    status.value = t("auth.invalidVerificationLink");
    error.value = true;
    return;
  }

  try {
    await $http.post(AUTH_VERIFY_EMAIL, { token });

    status.value = t("auth.yourEmailVerifiedSuccessfully");
  } catch {
    status.value = t("auth.verificationLinkInvalid");
    error.value = true;
  }
});
</script>

<template>
  <div
    class="d-flex align-center justify-center pa-4"
    style="min-height: 100vh"
  >
    <v-card rounded="lg" class="pa-4 w-100" max-width="500" title="Вітаю">
      <h3>{{ status }}</h3>
      <div class="text-end">
        <v-btn
          density="compact"
          variant="text"
          color="success"
          @click="goToLogin"
        >
          {{ t("auth.goToLogin") }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
