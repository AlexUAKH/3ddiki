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
        :to="{ name: menu.to }"
        class="flex items-center gap-1 px-2 py-1 hover:opacity-60 relative after:absolute after:-bottom-1 after:-translate-x-1/2 after:left-1/2 after:w-[0%] after:h-1 after:rounded-4xl transition-all duration-500"
        :class="{
          'after:w-[90%] after:bg-primary hover:opacity-100 cursor-default':
            menu.to === route.name,
          'hover:after:w-[90%] hover:after:bg-primary/70 cursor-pointer':
            menu.to !== route.name,
        }"
      >
        {{ menu.title }}
      </NuxtLink>
    </li>
  </ol>
</template>
