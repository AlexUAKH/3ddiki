<script setup lang="ts">
interface TextFieldProps {
  label: string;
  modelValue: string;
  error?: string | string[];
  example?: string;
}

const { modelValue, error } = defineProps<TextFieldProps>();
const emits = defineEmits(["update:model-value"]);

const value = computed({
  get: () => modelValue,
  set: (val: string) => {
    emits("update:model-value", val);
  },
});

const inputErrors = computed(() => {
  if (!error) return [];
  return typeof error === "string" ? [error] : error;
});
</script>

<template>
  <div class="">
    <div class="flex gap-2 items-center">
      {{ label }}
      <div v-if="example" class="text-sm">( {{ example }} )</div>
    </div>
    <input v-model="value" class="h-8 border rounded-md w-full" />
    <div v-if="inputErrors.length" class="space-y-0.5 mt-1">
      <div v-for="err in inputErrors" class="text-md text-red-500 leading-none">
        {{ err }}
      </div>
    </div>
  </div>
</template>
