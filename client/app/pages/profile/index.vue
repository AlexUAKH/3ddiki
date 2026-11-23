<script setup lang="ts">
import { PROFILE_API } from "~/constants/api";

const { t } = useI18n();

useHead({
  title: t("user.profile"),
});
definePageMeta({
  middleware: ["auth"],
});

const email = ref("");
const name = ref("");
const lastName = ref("");
const phone = ref("");
const password = ref("");
const city = ref("");
const errors = ref({
  email: "",
  password: "",
  name: "",
  lastName: "",
  phone: "",
  city: "",
});

const {
  data: user,
  pending,
  refresh,
} = await useAsyncApi<User>(PROFILE_API, {
  key: "profile-user",
  method: "GET",
  default: () => ({}) as User,
});

watch(
  user,
  (profile) => {
    if (!profile) return;

    name.value = profile.name ?? "";
    lastName.value = profile.lastName ?? "";
    email.value = profile.email ?? "";
  },
  { immediate: true },
);
</script>

<template>
  <div class="md:mt-6 p-4">
    <AppPageHeader class="mb-5"> {{ t("user.profile") }} </AppPageHeader>
    <AppCard class="max-w-175" hidden-close-btn>
      <form class="mt-4 space-y-3">
        <FormTextField
          v-model="name"
          :label="t('user.name')"
          :error="errors.name"
        />
        <FormTextField
          v-model="lastName"
          :label="t('user.lastName')"
          :error="errors.lastName"
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
