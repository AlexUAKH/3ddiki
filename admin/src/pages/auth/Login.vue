<script setup lang="ts">
import SimpleInput from "@/components/common/SimpleInput.vue";
import SpinnerFull from "@/components/common/SpinnerFull.vue";
import { useAuth } from "@/composables/auth";
import { useHelpers } from "@/composables/helpers";
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import { useField, useForm } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

interface ILoginForm {
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};

const sending = ref(false);
const showPassword = ref(false);
const showResendEmail = ref(false);

const auth = useAuthStore();
const { resendVerificationEmail } = useAuth();
const { t } = useI18n();
const router = useRouter();
const { errorMessage } = useHelpers();

const { handleSubmit, isSubmitting, setFieldValue, setFieldError, values } =
  useForm<ILoginForm>({
    initialValues,
  });

const redirectedEmail = computed(() => history.state.email || "");

useField("email", { email: true });
useField("password", { required: true, min: [6] });

const onSubmit = handleSubmit(async (values) => {
  try {
    await auth.login({
      email: values.email,
      password: values.password,
    });

    router.push("/");
  } catch (e: any) {
    if (e.status === 429) showResendEmail.value = true;
    toast.error(e.message);
    // setFieldError(e.field, e.message);
  } finally {
  }
});

const resendEmail = async () => {
  sending.value = true;
  try {
    if (!values.email) return;
    await resendVerificationEmail(values.email);

    toast.success(t("auth.verificationEmail"));
  } catch (error: any) {
    toast.error(errorMessage(error));
  } finally {
    sending.value = false;
  }
};

onMounted(() => {
  if (redirectedEmail.value) {
    setFieldValue("email", redirectedEmail.value);
  }
});
</script>

<template>
  <div class="align-self-center w-100">
    <SpinnerFull :show="isSubmitting" />

    <v-card max-width="500" elevation="4" class="px-2 py-2 mx-auto">
      <v-container v-if="showResendEmail">
        <div class="text-center text-title-medium">
          {{ t("auth.notVerifiedEmail") }}
        </div>

        <div class="mt-4 text-body-small">
          Для початку роботи підтвердіть адресу електонної пошти. Посилання для
          підтвердження було надіслано при реєстрації. Якщо ви не отримували
          листа, або термін дії посилання закінчився, запросіть нового листа
        </div>

        <div class="text-end">
          <v-btn
            class="mt-6"
            type="submit"
            color="success"
            @click="resendEmail"
            :loading="sending"
            :disabled="sending"
          >
            {{ t("auth.resendVerificationEmail") }}
          </v-btn>
        </div>
      </v-container>

      <v-container v-show="!showResendEmail">
        <div class="text-center text-2xl">
          {{ t("auth.loginToYourAccount") }}
        </div>
        <v-form @submit.prevent="onSubmit" class="mt-4">
          <SimpleInput name="email" :label="t('auth.email')" class="mb-2" />
          <SimpleInput
            name="password"
            :label="t('auth.password')"
            :type="showPassword ? 'text' : 'password'"
            class="mb-2"
            append-icon="mdi-eye"
            @click:appendInner="showPassword = !showPassword"
          />
          <v-row>
            <v-col>
              <router-link :to="{ name: ERouteNames.forgotPassword }">
                {{ t("auth.forgotPassword") }}?
              </router-link>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col align="end">
              <v-btn
                type="submit"
                color="success"
                @click="onSubmit"
                :loading="isSubmitting"
                :disabled="isSubmitting"
              >
                {{ t("auth.login") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>
