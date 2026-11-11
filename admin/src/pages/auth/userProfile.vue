<script setup lang="ts">
import FormActions from "@/components/common/FormActions.vue";
import PageHeader from "@/components/common/PageHeader.vue";
import { useAuth } from "@/composables/auth";
import { type UserInfo } from "@/composables/auth.types";
import { useHelpers } from "@/composables/helpers";
import { useUsers, type UpdateUser } from "@/composables/users";
import { USER_PROFILE_ICON } from "@/constants/iconsMap";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useField, useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const loading = ref(false);
const processing = ref(false);
const minNameLength = 3;
const userInfo = ref<UserInfo>({} as UserInfo);

const { getUserInfo } = useAuth();
const { user } = storeToRefs(useAuthStore());
const { t } = useI18n();
const { handleSubmit } = useForm<UserInfo>({});
const { updateUser } = useUsers();
const { errorMessage } = useHelpers();

const name = useField<string>("name", { required: true, min: minNameLength });
const lastName = useField<string>("lastName", {
  required: true,
  min: minNameLength,
});
// const email = useField<string>("email", { required: true, email: true });
// const role = useField<Role>("role", { required: true });

const submit = handleSubmit(async () => {
  processing.value = true;

  const data: UpdateUser = {
    name: name.value.value,
    lastName: lastName.value.value,
  };

  try {
    await updateUser(userInfo.value.id, data);
    user.value.name = name.value.value;
    user.value.lastName = lastName.value.value;
    toast.success(t("customers.customerWasUpdatedSuccessfully"));
  } catch (error: any) {
    // if (error) {
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getUserInfo();
    console.log("user info res: ", res);
    userInfo.value = res.data;

    name.value.value = userInfo.value.name;
    lastName.value.value = userInfo.value.lastName;
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <!-- <SpinnerFull :show="loading" /> -->

    <PageHeader :header="t('userProfile.header')" :icon="USER_PROFILE_ICON" />
    <v-card
      max-width="600"
      :loading="loading"
      class="mt-4 pa-4 mx-auto"
      variant="outlined"
    >
      <v-form class="mt-4">
        <v-text-field
          v-model="name.value.value"
          :error-messages="
            t(name.errorMessage.value || '', { limit: minNameLength })
          "
          :label="t('customers.name')"
        />

        <v-text-field
          v-model="lastName.value.value"
          :error-messages="
            t(lastName.errorMessage.value || '', { limit: minNameLength })
          "
          :label="t('customers.lastName')"
        />

        <v-text-field
          v-model="userInfo.email"
          disabled
          :label="t('customers.email')"
        />

        <v-text-field
          v-model="userInfo.role"
          disabled
          :label="t('customers.role')"
        />

        <FormActions
          :processing="processing"
          ok-btn-label="Зберегти"
          hide-cancel-btn
          @confirm="submit"
        />
      </v-form>

      <div
        v-if="!loading && userInfo && Object.keys(userInfo).length == 0"
        class=""
      >
        Не вдалось отримати інформацію про користувача
      </div>
    </v-card>
  </div>
</template>

<style scoped></style>
