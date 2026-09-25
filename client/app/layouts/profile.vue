<script setup lang="ts">
import {
  PROFILE_ORDER_LIST_PAGE,
  PROFILE_PAGE,
  PROFILE_WISH_LIST_PAGE,
} from "~/constants/routeNames";

const { t } = useI18n();
const route = useRoute();

const menus = computed(() => [
  { title: t("user.profile"), to: PROFILE_PAGE },
  {
    title: t("user.order", 2),
    to: PROFILE_ORDER_LIST_PAGE,
  },
  {
    title: t("user.wishList"),
    to: PROFILE_WISH_LIST_PAGE,
  },
]);
</script>

<template>
  <AppContainer>
    <div class="flex flex-col md:flex-row gap-4">
      <div class="hidden md:block w-52">
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
