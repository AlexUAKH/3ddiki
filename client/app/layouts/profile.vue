<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const menus = computed(() => [
  { title: t("user.profile"), to: "profile" },
  {
    title: t("user.order", 2),
    to: "profile-ordersList",
  },
  {
    title: t("user.wishList"),
    to: "profile-wishList",
  },
]);
</script>

<template>
  <AppContainer>
    <div class="flex gap-4">
      <div class="w-52">
        <ol class="mt-10 text-xl">
          <li v-for="menu in menus">
            <AppLinkBtn
              :active="menu.to === route.name"
              :to="{ name: menu.to }"
            >
              {{ menu.title }}
            </AppLinkBtn>
          </li>
        </ol>
      </div>
      <div class="w-full">
        <slot />
      </div>
    </div>
  </AppContainer>
</template>
