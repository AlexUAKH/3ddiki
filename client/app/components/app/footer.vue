<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <footer class="">
    <AppContainer class="py-4">
      <p class="text-center">
        © Copyright {{ new Date().getFullYear() }}. {{ t("footer.allRights") }}
        <NuxtLink
          class="font-medium ml-1"
          href="https://github.com/AlexUAKH"
          target="_blank"
        >
          Alex
        </NuxtLink>
      </p>
    </AppContainer>
  </footer>
</template>
