<script lang="ts" setup>
import SimpleInput from "@/components/common/SimpleInput.vue";
import SpinnerFull from "@/components/common/SpinnerFull.vue";
import { useAuth } from "@/composables/auth";
import { ERouteNames } from "@/router/router.types";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue3-toastify";

interface resetForm {
  email: string;
}
const initialValues = {
  email: "",
};

const { handleSubmit, isSubmitting } = useForm<resetForm>({
  initialValues,
});

useField("email", { email: true });

const message = ref("");
const error = ref("");
const { forgotPassword } = useAuth();

const resetPassword = handleSubmit(async (values): Promise<void> => {
  error.value = "";
  try {
    let data = {} as any;

    const response = await forgotPassword(data);
    message.value = response.message;
    toast.success(`Success!! Link was sent successfully`);
  } catch (err: any) {
    error.value = err.message; //err.errors.email[0] || err.errors.passport[0];
  }
});
</script>

<template>
  <div class="self-center">
    <SpinnerFull :show="isSubmitting" />

    <v-card max-width="500" class="px-2 py-2 w-100 ma-4">
      <v-container>
        <div class="text-center text-2xl">Reset your password</div>

        <v-form @submit.prevent="resetPassword" class="mt-4">
          <v-alert type="error" class="mb-2" v-if="error">
            {{ error }}
          </v-alert>
          <v-alert v-if="message" type="success">
            {{ message }}
          </v-alert>
          <SimpleInput name="email" label="Email" class="mb-3" />

          <div class="flex justify-between items-center">
            <v-btn
              type="submit"
              form="reset-password-form"
              @click="resetPassword"
              :disabled="isSubmitting"
              color="success"
            >
              Send reset link
            </v-btn>
            <v-btn :to="{ name: ERouteNames.login }" color="error">
              Back to login
            </v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>
