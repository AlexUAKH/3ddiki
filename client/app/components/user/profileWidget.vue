<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const login = () => {
  if (route.name !== "login") router.push({ name: "login" });
};
</script>

<template>
  <Icon
    name="mdi:account-outline"
    class="size-6 md:size-8 cursor-pointer"
    @click="login"
  />
</template>
