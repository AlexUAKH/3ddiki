<script setup lang="ts">
interface IdProps {}

defineProps<IdProps>();

const router = useRouter();

const route = useRoute();
</script>

<template>
  <AppContainer>
    <div class="">
      <AppButton @click="router.go(-1)"> back </AppButton>
      <div class="">fullPath: {{ route.fullPath }}</div>
      <div class="">params: {{ route.params }}</div>
      <div class="">query: {{ route.query }}</div>
    </div>
  </AppContainer>
</template>
