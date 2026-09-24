<script setup lang="ts">
const email = ref("");
const name = ref("");
const surName = ref("");
const phone = ref("");
const password = ref("");
const city = ref("");
const errors = ref({
  email: "",
  password: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
});

const { t } = useI18n();
</script>

<template>
  <div class="mt-6 p-4">
    <div class="text-5xl mb-5">{{ t("user.profile") }}</div>
    <AppCard class="w-full">
      <form class="mt-4 space-y-3">
        <FormTextField
          v-model="name"
          :label="t('login.name')"
          :error="errors.name"
        />
        <FormTextField
          v-model="surName"
          :label="t('login.surname')"
          :error="errors.surname"
        />
        <FormTextField
          v-model="email"
          :label="t('login.email')"
          :error="errors.email"
        />
        <FormTextField
          v-model="phone"
          :label="t('login.phone')"
          example="380671112233"
          :error="errors.phone"
        />
        <FormTextField
          v-model="password"
          :label="t('login.password')"
          :error="errors.password"
        />
        <FormTextField
          v-model="city"
          :label="t('login.city')"
          :error="errors.city"
        />
      </form>

      <AppCardActions
        class="mt-4"
        justify="center"
        :ok-text="t('common.save')"
        hide-cancel-btn
        disabled
      />
    </AppCard>
  </div>
</template>
