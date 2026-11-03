<script setup lang="ts">
const emits = defineEmits(["close", "login"]);

const email = ref("");
const name = ref("");
const surName = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref({
  email: "",
  password: "",
  name: "",
  surname: "",
  phone: "",
  confirmPassword: "",
});

const { t } = useI18n();

const close = () => {
  emits("close");
};

const register = () => {};
</script>

<template>
  <div>
    <div class="mt-4 text-center font-serif text-xl font-semibold">
      {{ t("login.register") }}
    </div>
    <form class="mt-4 space-y-2">
      <FormTextField
        v-model="name"
        :label="t('login.name')"
        block
        :error="errors.name"
      />
      <FormTextField
        v-model="surName"
        :label="t('login.surname')"
        block
        :error="errors.surname"
      />
      <FormTextField
        v-model="email"
        :label="t('login.email')"
        block
        :error="errors.email"
      />
      <FormTextField
        v-model="phone"
        :label="t('login.phone')"
        example="380671112233"
        block
        :error="errors.phone"
      />
      <FormTextField
        v-model="password"
        :label="t('login.password')"
        block
        :error="errors.password"
      />
      <FormTextField
        v-model="confirmPassword"
        :label="t('login.confirmPassword')"
        block
        :error="errors.confirmPassword"
      />
    </form>

    <div class="mt-2 flex gap-2 items-center">
      {{ t("user.registered") }}?.
      <AppButton class="text-blue-400" @click.stop="$emit('login')">{{
        t("user.login")
      }}</AppButton>
    </div>

    <AppCardActions
      class-mt-4
      ok-text="login.sent"
      @confirm="register"
      @cancel="close"
    />
  </div>
</template>
