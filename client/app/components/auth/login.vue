<script setup lang="ts">
const emits = defineEmits(["forgot-password", "close", "register"]);

const email = ref("");
const password = ref("");
const errors = ref({ email: "", password: ["", ""] });
const isSubmitting = ref(false);
const userStore = useUserStore();

const { t } = useI18n();

const close = () => {
  emits("close");
};

const login = async () => {
  errors.value = { email: "", password: ["", ""] };
  isSubmitting.value = true;

  try {
    await userStore.login(email.value, password.value);
    emits("close");
  } catch (error: any) {
    const message = error?.data?.message;
    errors.value.password = Array.isArray(message)
      ? message
      : [message || "Invalid email or password"];
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div>
    <div class="mt-4 text-center font-serif text-xl font-semibold">
      {{ t("login.login") }}
    </div>
    <form class="mt-4 space-y-2" @submit.prevent="login">
      <FormTextField
        v-model="email"
        :label="t('user.email')"
        :error="errors.email"
      />
      <FormTextField
        v-model="password"
        type="password"
        :label="t('user.password')"
        :error="errors.password"
      />
    </form>

    <div class="mt-6 flex gap-2 items-center">
      {{ t("login.notRegistered") }}?
      <AppButton class="text-blue-400" @click.stop="$emit('register')">{{
        t("login.register")
      }}</AppButton>
    </div>

    <div class="mt-2">
      <AppButton @click.stop="$emit('forgot-password')" class="-ml-2">
        {{ t("login.forgotPassword") }}?
      </AppButton>
    </div>

    <AppCardActions
      class-mt-4
      ok-text="login.sent"
      :processing="isSubmitting"
      :disabled="isSubmitting || !email || !password"
      @confirm="login"
      @cancel="close"
    />

    <Teleport v-if="isSubmitting" to="#teleports">
      <AppLoader />
    </Teleport>
  </div>
</template>
