<script setup lang="ts">
const isLoggedIn = ref(false);

const showUserMenu = shallowRef(false);
const userMenuRef = useTemplateRef("userMenuRef");

const { setShowAuth } = useAppStore();
const { t } = useI18n();

const userMenus = computed(() => [
  { title: t("user.profile"), icon: "mdi:account-outline", to: "profile" },
  {
    title: t("user.order", 2),
    icon: "mdi:list-box-outline",
    to: "profile-ordersList",
  },
  {
    title: t("user.wishList"),
    icon: "mdi:heart-outline",
    to: "profile-favorites",
  },
]);

onClickOutside(userMenuRef, (event) => {
  console.log(event);
  showUserMenu.value = false;
});

const openLogin = () => {
  console.log("show login: ");

  setShowAuth(true);
};

const setShowUserMenu = (val: boolean) => {
  showUserMenu.value = val;
};

const closeUserMenu = () => {
  showUserMenu.value = false;
};

const handleWidgetClick = () => {
  if (isLoggedIn.value) {
    setShowUserMenu(true);
    return;
  }
  openLogin();
};

const logout = () => {};
</script>

<template>
  <div class="relative">
    <AppButton @click.stop="handleWidgetClick">
      <Icon name="mdi:account-outline" class="size-6 md:size-8" />
    </AppButton>

    <div
      v-if="showUserMenu"
      ref="userMenuRef"
      class="absolute right-0 origin-top-right mt-2 py-2 border rounded-lg shadow-md bg-app"
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
          <AppBtn class="whitespace-nowrap px-5 text-xl gap-2" @click="logout">
            <Icon name="mdi:logout" />
            <div>{{ t("user.logout") }}</div>
          </AppBtn>
        </li>
      </ol>
    </div>
  </div>
</template>
