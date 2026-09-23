<script setup lang="ts">
interface MenuProps {
  modelValue?: boolean;
  items: { title: string; icon: string; to: string }[];
}

const props = withDefaults(defineProps<MenuProps>(), { items: () => [] });
const emits = defineEmits(["activator-click", "select", "updateModel-value"]);

const showMenu = shallowRef(false);
const menuRef = useTemplateRef("menuRef");

onClickOutside(menuRef, (event) => {
  console.log(event);
  showMenu.value = false;
});

const setShowMenu = (val: boolean) => {
  emits("activator-click");
  showMenu.value = val;
};

const closeUserMenu = () => {
  showMenu.value = false;
};
</script>

<template>
  <div class="relative">
    <div @click="setShowMenu(!showMenu)">
      <slot />
    </div>

    <div
      v-if="showMenu"
      ref="menuRef"
      class="absolute right-0 origin-top-right mt-2 py-2 border rounded-lg shadow-md bg-app"
    >
      <slot v-if="$slots.items" name="items" />
      <ol v-else class="list-none space-y-1">
        <li
          class=""
          v-for="item in items"
          :key="item.title"
          @click="closeUserMenu"
        >
          <slot v-if="$slots.item" name="item" :item="{ ...item }" />
          <AppLinkBtn
            v-else
            :to="{ name: item.to }"
            class="whitespace-nowrap px-5 text-xl gap-2"
          >
            <Icon v-if="item.icon" :name="item.icon" />
            <div>{{ item.title }}</div>
          </AppLinkBtn>
        </li>
      </ol>
    </div>
  </div>
</template>
