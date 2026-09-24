<script setup lang="ts">
import type { MainMenu } from "~/types";

interface MainMenuProps {
  items: MainMenu[];
}

const props = withDefaults(defineProps<MainMenuProps>(), {
  items: () => [],
});

const route = useRoute();

const menus = computed(() => props.items.filter((item) => !!item.title));
</script>

<template>
  <ol class="flex gap-4 items-center">
    <li v-for="menu in menus">
      <NuxtLink
        :to="menu.to"
        class="flex items-center gap-1 px-2 py-1 hover:opacity-60 cursor-pointer relative"
        :class="{
          'after:absolute after:-bottom-1 after:-translate-x-1/2 after:left-1/2 after:w-[90%] after:h-0.75 after:bg-primary after:rounded-4xl':
            menu.to === route.name,
        }"
      >
        {{ menu.title }}
      </NuxtLink>
    </li>
  </ol>
</template>
