<script setup lang="ts">
import SimpleInput from "@/components/common/SimpleInput.vue";
import SpinnerFull from "@/components/common/SpinnerFull.vue";
import { ERouteNames } from "@/router/router.types";
import { useAuthStore } from "@/stores/auth";
import { useField, useForm } from "vee-validate";
import { computed, onMounted, ref } from "vue";
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

const showPassword = ref(false);

const auth = useAuthStore();
const router = useRouter();
const { handleSubmit, isSubmitting, setFieldValue, setFieldError } =
  useForm<ILoginForm>({
    initialValues,
  });

const redirectedEmail = computed(() => history.state.email || "");

useField("email", { email: true });
useField("password", { required: true, min: [6] });

const onSubmit = handleSubmit(async (values) => {
  console.log("handleSubmit values: ", values);
  try {
    const res = await auth.login({
      email: values.email,
      password: values.password,
    });
    console.log("onSubmit: ", res);

    router.push("/");
  } catch (e: any) {
    console.log("eee: ", e.message);

    toast.error(e.message);
    setFieldError(e.field, e.message);
  } finally {
  }
});
onMounted(() => {
  if (redirectedEmail.value) {
    setFieldValue("email", redirectedEmail.value);
  }
});
</script>

<template>
  <div class="self-center">
    <SpinnerFull :show="isSubmitting" />

    <v-card max-width="500" elevation="4" class="px-2 py-2 w-100 ma-4">
      <v-container>
        <div class="text-center text-2xl">Login to your account</div>
        <v-form @submit.prevent="onSubmit" class="mt-4">
          <SimpleInput name="email" label="Email" class="mb-2" />
          <SimpleInput
            name="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            class="mb-2"
            append-icon="mdi-eye"
            @click:appendInner="showPassword = !showPassword"
          />
          <v-row>
            <v-col>
              <router-link :to="{ name: ERouteNames.forgotPassword }">
                Forgot password?
              </router-link>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col align="end">
              <v-btn
                type="submit"
                color="success"
                @click="onSubmit"
                :disabled="isSubmitting"
              >
                Log In
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </div>
</template>
