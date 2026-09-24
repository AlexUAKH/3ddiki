<script setup lang="ts">
import type { MainMenu } from "~/types";

interface MobileMenuProps {
  items: MainMenu[];
}

const props = withDefaults(defineProps<MobileMenuProps>(), {
  items: () => [],
});
const emits = defineEmits(["close"]);

const route = useRoute();

const menus = computed(() => props.items.filter((item) => !!item.title));

const close = () => {
  emits("close");
};
</script>

<template>
  <AppOverlay class="bg-black">
    <div class="mt-2 flex justify-end mr-2">
      <AppButton @click="close">
        <Icon class="size-8" name="mdi:close" />
      </AppButton>
    </div>

    <div class="mt-30">
      <ol class="flex flex-col justify-center items-center gap-8">
        <li v-for="menu in menus" class="text-3xl whitespace-nowrap">
          <NuxtLink
            :to="menu.to"
            class="flex items-center gap-1 px-2 py-1 hover:opacity-60 cursor-pointer relative active:top-1"
            :class="{ 'bg-gray-600 rounded-lg': menu.to === route.name }"
            @click="close"
          >
            {{ menu.title }}
          </NuxtLink>
        </li>
      </ol>
    </div>
  </AppOverlay>
</template>
