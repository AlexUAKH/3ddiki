<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

interface Props {
  type?: string;
  value?: string;
  name: string;
  label: string;
  successMessage?: string;
  icon?: string;
  appendIcon?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  value: "",
  name: "",
  label: "",
  successMessage: "",
  icon: "",
  appendIcon: "",
  placeholder: "",
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div
    class="TextInput"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <label :for="name">{{ label }}</label>
    <v-text-field
      v-bind="$attrs"
      label=""
      :prepend-inner-icon="icon"
      :append-inner-icon="appendIcon"
      :name="name"
      :id="name"
      :type="type"
      :model-value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      :error-messages="errorMessage"
    ></v-text-field>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}
.TextInput {
  position: relative;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 4px;
  width: 100%;
}

.v-field__input {
  background: #f23648;
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 4px 10px;
  outline: none;
  background-color: #f2f5f7;
  width: 100%;
  transition:
    border-color 0.3s ease-in-out,
    color 0.3s ease-in-out,
    background-color 0.3s ease-in-out;
}

.v-field__input:focus {
  border-color: var(--primary-color);
}

.TextInput.has-error input {
  background-color: var(--error-bg-color);
  color: var(--error-color);
}

.TextInput.has-error input:focus {
  border-color: var(--error-color);
}

.TextInput.success input {
  background-color: var(--success-bg-color);
  color: var(--success-color);
}

.TextInput.success input:focus {
  border-color: var(--success-color);
}
</style>
