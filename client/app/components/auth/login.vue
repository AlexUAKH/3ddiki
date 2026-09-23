<script setup lang="ts">
const emits = defineEmits(["forgot-password", "close", "register"]);

const email = ref("");
const password = ref("");
const errors = ref({ email: "", password: ["", ""] });

const { t } = useI18n();

const close = () => {
  emits("close");
};

const login = () => {};
</script>

<template>
  <div>
    <div class="mt-4 text-center font-serif text-xl font-semibold">
      {{ t("login.login") }}
    </div>
    <form class="mt-4 space-y-2">
      <FormTextField
        v-model="email"
        :label="t('login.email')"
        block
        :error="errors.email"
      />
      <FormTextField
        v-model="password"
        :label="t('login.password')"
        block
        :error="errors.password"
      />
    </form>

    <div class="mt-2 flex gap-2 items-center">
      {{ t("user.notRegistered") }}?.
      <AppButton class="text-blue-400" @click.stop="$emit('register')">{{
        t("user.register")
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
      @confirm="login"
      @cancel="close"
    />
  </div>
</template>
