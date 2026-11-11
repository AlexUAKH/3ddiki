<script setup lang="ts">
import FormActions from "@/components/common/FormActions.vue";
import { useAuth } from "@/composables/auth";
import { useHelpers } from "@/composables/helpers";
import { ERouteNames } from "@/router/router.types";
import { useField, useForm } from "vee-validate";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const minLength = 8;

const processing = ref(false);
const showPassword = ref(false);

const { errorMessage } = useHelpers();
const { changePassword } = useAuth();
const { handleSubmit, meta } = useForm({});
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const email = computed(() => String(route.query.email || ""));
const token = computed(() => String(route.query.token || ""));

const password = useField<string>("password", {
  required: true,
  password: minLength,
});
const confirmPassword = useField<string>("confirmPassword", {
  required: true,
  confirmed: ["@password"],
});

const submit = handleSubmit(async (event) => {
  if (event.password !== event.confirmPassword) return;

  processing.value = true;
  try {
    await changePassword(token.value, email.value, event.password);

    toast.success("Пароль успішно змінено");
    toLogin();
  } catch (error: any) {
    // if (error) {
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

const toLogin = () => {
  router.replace({ name: ERouteNames.login });
};
</script>

<template>
  <div class="align-self-center w-100">
    <v-card max-width="500" elevation="4" class="px-2 py-2 mx-auto">
      <v-card-title class="text-center"> Новий Пароль </v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model.trim="email"
            :label="t('common.email')"
            disabled
          />
          <v-text-field
            v-model.trim="password.value.value"
            :error-messages="
              t(password.errorMessage.value || '', { limit: minLength })
            "
            :label="t('auth.password')"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-text-field
            v-model.trim="confirmPassword.value.value"
            :error-messages="
              t(confirmPassword.errorMessage.value || '', { limit: minLength })
            "
            :label="t('auth.confirmPassword')"
            :type="showPassword ? 'text' : 'password'"
          />
        </v-form>

        <FormActions
          :processing="processing"
          ok-btn-label="Зберегти пароль"
          cancel-btn-label="Повернутися"
          :disabled="!meta.valid"
          @confirm="submit"
          @reject="toLogin"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
