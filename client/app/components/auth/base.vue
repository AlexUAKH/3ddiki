<script setup lang="ts">
type Tabs = "login" | "register" | "forgot";

const activeTab = ref<Tabs>("login");

const { setShowAuth } = useAppStore();

const close = () => {
  setShowAuth(false);
};
</script>

<template>
  <AppOverlay @click.stop="close" class="flex items-center justify-center">
    <div
      @click.stop
      class="relative w-full bg-app max-w-lg border rounded-xl p-4"
    >
      <div class="absolute right-3 top-3" @click="close">
        <Icon name="mdi:close" class="size-6 cursor-pointer" />
      </div>

      <AuthLogin
        v-if="activeTab === 'login'"
        @close="close"
        @forgot-password="activeTab = 'forgot'"
        @register="activeTab = 'register'"
      />
      <AuthRegistration v-if="activeTab === 'register'" @close="close" />
      <AuthForgotPassword v-if="activeTab === 'forgot'" />
    </div>
  </AppOverlay>
</template>
