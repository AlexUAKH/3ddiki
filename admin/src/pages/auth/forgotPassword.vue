<script lang="ts" setup>
import FormActions from "@/components/common/FormActions.vue";
import { useAuth } from "@/composables/auth";
import { useHelpers } from "@/composables/helpers";
import { ERouteNames } from "@/router/router.types";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

interface resetForm {
  email: string;
}
const initialValues = {
  email: "",
};

const { handleSubmit, isSubmitting, values, meta } = useForm<resetForm>({
  initialValues,
});

const email = useField("email", { required: true, email: true });

const { forgotPassword } = useAuth();
const { errorMessage } = useHelpers();
const router = useRouter();
const { t } = useI18n();
const success = ref(false);

const submit = handleSubmit(async (values): Promise<void> => {
  try {
    await forgotPassword(values.email);

    toast.success(`Success!! Link was sent successfully`);
    success.value = true;
  } catch (err: any) {
    toast.error(errorMessage(err));
    // error.value = errorMessage(err); //err.errors.email[0] || err.errors.passport[0];
  }
});

const toLogin = () => {
  router.push({ name: ERouteNames.login });
};
</script>

<template>
  <div class="align-self-center w-100">
    <v-card max-width="500" elevation="4" class="px-2 py-2 mx-auto">
      <v-card-title class="text-center text-2xl"
        >Відновлення паролю</v-card-title
      >
      <v-container>
        <v-form v-if="!success" @submit.prevent class="mt-4">
          <v-text-field
            v-model.trim="email.value.value"
            name="forgot-email"
            :error-messages="t(email.errorMessage.value || '')"
            :label="t('auth.email')"
          />

          <FormActions
            :processing="isSubmitting"
            ok-btn-label="Send reset link"
            cancel-btn-label="Back to login"
            :disabled="!meta.valid"
            @confirm="submit"
            @reject="toLogin"
          />
        </v-form>

        <div v-if="success" class="">
          Посилання для відновлення паролю було надіслано на вашу електронну
          пошту.
        </div>
      </v-container>
    </v-card>
  </div>
</template>
