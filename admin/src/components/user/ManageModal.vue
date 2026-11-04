<script setup lang="ts">
import { useHelpers } from "@/composables/helpers.ts";
import { useUsers, type CreateUser, type Role } from "@/composables/users.ts";
import { FILAMENT_API } from "@/constants/api-const.ts";
import $http from "@/plugins/axios.ts";
import { useField, useForm } from "vee-validate";
import { ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import FormActions from "../common/FormActions.vue";

const minNameLength = 3;

interface Props {
  open: boolean;
  id?: string | undefined;
  roles: Role[];
}

const props = withDefaults(defineProps<Props>(), {
  roles: () => [],
});

const emits = defineEmits(["change", "close"]);

const loading = ref(false);
const processing = ref(false);

const { errorMessage } = useHelpers();
const { handleSubmit, resetForm } = useForm({});
const { t } = useI18n();
const { createUser, updateUser } = useUsers();

const name = useField<string>("name", { required: true, min: minNameLength });
const lastName = useField<string>("lastName", {
  required: true,
  min: minNameLength,
});
const email = useField<string>("email", { required: true, email: true });
const role = useField<Role>("role", { required: true });
const isEmailVerified = ref(false);

const submit = handleSubmit(async (event) => {
  processing.value = true;

  const data: CreateUser = {
    name: name.value.value,
    lastName: lastName.value.value,
    email: email.value.value,
    role: role.value.value,
    isEmailVerified: isEmailVerified.value,
  };

  try {
    props.id ? await updateUser(props.id, data) : await createUser(data);

    toast.success(
      props.id
        ? t("customers.customerWasUpdatedSuccessfully")
        : t("customers.newCustomerCreated"),
    );

    emits("change");
    resetForm();
  } catch (error: any) {
    // if (error) {
    console.log("onRequestError: ", errorMessage(error));
    toast.error(errorMessage(error));
  } finally {
    processing.value = false;
  }
});

watchEffect(async () => {
  if (props.id) {
    loading.value = true;
    try {
      const response = await $http.get(`${FILAMENT_API}/${props.id}`);

      name.value.value = response.data.name;
      lastName.value.value = response.data.lastName;
      email.value.value = response.data.email;
      role.value.value = response.data.role;
      isEmailVerified.value = response.data.isEmailVerified;
    } catch (error) {
      toast.error(errorMessage(error));
    } finally {
      loading.value = false;
    }
  }
});
</script>

<template>
  <v-dialog :model-value="open" max-width="500" persistent transition="scale">
    <v-card :loading="loading">
      <v-card-title class="text-center">
        {{
          `${id ? t("common.edit") : t("common.create")} ${t("customers.customer", 2)}`
        }}
      </v-card-title>

      <v-card-text>
        <v-form>
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
            v-model="email.value.value"
            :error-messages="
              t(email.errorMessage.value || '', { limit: minNameLength })
            "
            :label="t('customers.email')"
          />
          <v-autocomplete
            class="mt-2"
            v-model="role.value.value"
            :items="roles"
            :error-messages="t(role.errorMessage.value || '')"
            :label="t('customers.role')"
          />
          <v-switch
            v-model="isEmailVerified"
            color="primary"
            :label="t('customers.setAsEmailVerified')"
          ></v-switch>
        </v-form>

        <FormActions
          :processing="processing"
          @confirm="submit"
          @reject="$emit('close')"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
