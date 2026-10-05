<script setup lang="ts">
import {
  PROFILE_ORDER_LIST_PAGE,
  PROFILE_PAGE,
  PROFILE_WISH_LIST_PAGE,
} from "~/constants/routeNames";
const showUserMenu = shallowRef(false);
const userMenuRef = useTemplateRef("userMenuRef");

const { setShowAuth } = useAppStore();
const { isLoggedIn } = storeToRefs(useUserStore());
const router = useRouter();
const { t } = useI18n();

const userMenus = computed(() => [
  { title: t("user.profile"), icon: "mdi:account-outline", to: PROFILE_PAGE },
  {
    title: t("user.order", 2),
    icon: "mdi:list-box-outline",
    to: PROFILE_ORDER_LIST_PAGE,
  },
  {
    title: t("user.wishList"),
    icon: "mdi:heart-outline",
    to: PROFILE_WISH_LIST_PAGE,
  },
]);

onClickOutside(userMenuRef, (event) => {
  console.log(event);
  showUserMenu.value = false;
});

const setShowUserMenu = (val: boolean) => {
  showUserMenu.value = val;
};

const closeUserMenu = () => {
  showUserMenu.value = false;
};

const handleWidgetClick = () => {
  if (isLoggedIn.value) {
    setShowUserMenu(!showUserMenu.value);
    return;
  }
  setShowAuth(true);
};

const logout = () => {
  router.push("/");
};
</script>

<template>
  <div class="relative">
    <AppButton @click.stop="handleWidgetClick">
      <Icon name="mdi:account-outline" class="size-6 md:size-8" />
    </AppButton>

    <div
      v-if="showUserMenu"
      ref="userMenuRef"
      class="absolute z-50 right-0 origin-top-right mt-2 py-2 border rounded-lg shadow-md bg-app"
    >
      <ol class="list-none space-y-1">
        <li class="" v-for="menu in userMenus" :key="menu.title">
          <AppLinkBtn
            :to="{ name: menu.to }"
            class="whitespace-nowrap px-5 text-xl gap-2"
            @click="closeUserMenu"
          >
            <Icon :name="menu.icon" />
            <div>{{ menu.title }}</div>
          </AppLinkBtn>
        </li>
        <li class="border-t">
          <AppButton
            class="whitespace-nowrap px-5 text-xl gap-2"
            @click="logout"
          >
            <Icon name="mdi:logout" />
            <div>{{ t("login.logout") }}</div>
          </AppButton>
        </li>
      </ol>
    </div>
  </div>
</template>
