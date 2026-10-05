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

useHead({
  title: t("user.profile"),
});
</script>

<template>
  <div class="md:mt-6 p-4">
    <AppPageHeader class="mb-5">
      {{ t("") }}
    </AppPageHeader>
    <AppCard class="w-full">
      <form class="mt-4 space-y-3">
        <FormTextField
          v-model="name"
          :label="t('user.name')"
          :error="errors.name"
        />
        <FormTextField
          v-model="surName"
          :label="t('user.surname')"
          :error="errors.surname"
        />
        <FormTextField
          v-model="email"
          :label="t('user.email')"
          :error="errors.email"
        />
        <FormTextField
          v-model="phone"
          :label="t('user.phone')"
          example="380671112233"
          :error="errors.phone"
        />
        <FormTextField
          v-model="password"
          :label="t('user.password')"
          :error="errors.password"
        />
        <FormTextField
          v-model="city"
          :label="t('user.city')"
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
