<script setup lang="ts">
import { useAuth } from "@/composables/auth";
import { useHelpers } from "@/composables/helpers";
import { AUTH_VERIFY_EMAIL } from "@/constants/api-const";
import $http from "@/plugins/axios";
import { ERouteNames } from "@/router/router.types";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { errorMessage } = useHelpers();
const { resendVerificationEmail } = useAuth();

const status = ref(t("auth.verifyingYourEmail"));
const error = ref(false);
const verifying = ref(true);
const resending = ref(false);
const hideResendBtn = ref(false);

const goToLogin = () => {
  router.replace({ name: ERouteNames.login });
};

const resend = async () => {
  if (!email.value) return;

  resending.value = true;
  try {
    await resendVerificationEmail(email.value);

    toast.success(t("auth.verificationEmail"));
    status.value = t("auth.verificationEmail");
    hideResendBtn.value = true;
  } catch (error: any) {
    if (error.status === 444) {
      hideResendBtn.value = true;
      status.value = errorMessage(error);
    }
    toast.error(errorMessage(error));
  } finally {
    resending.value = false;
  }
};

const email = computed(() => String(route.query.email || ""));
const token = computed(() => String(route.query.token || ""));

onMounted(async () => {
  if (typeof token.value !== "string" || !token.value) {
    status.value = t("auth.invalidVerificationLink");
    error.value = true;
    return;
  }

  try {
    await $http.post(AUTH_VERIFY_EMAIL, { token: token.value });

    status.value = t("auth.yourEmailVerifiedSuccessfully");
  } catch {
    status.value = t("auth.verificationLinkInvalid");
    error.value = true;
  } finally {
    verifying.value = false;
  }
});
</script>

<template>
  <div
    class="d-flex align-center justify-center pa-4"
    style="min-height: 100vh"
  >
    <v-card
      rounded="lg"
      class="pa-8 w-100"
      max-width="500"
      :title="error ? 'Упс' : ''"
    >
      <h3>{{ status }}</h3>
      <div class="text-center" v-if="verifying">
        <v-progress-circular color="green" indeterminate></v-progress-circular>
      </div>
      <div class="text-end">
        <v-btn
          v-if="!error && !verifying"
          density="compact"
          color="success"
          @click="goToLogin"
        >
          {{ t("auth.goToLogin") }}
        </v-btn>
        <v-btn
          v-if="error && !verifying && !hideResendBtn"
          density="compact"
          color="error"
          :loading="resending"
          @click="resend"
        >
          {{ t("auth.resendVerificationEmail") }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
