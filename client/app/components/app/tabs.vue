<script setup lang="ts">
interface TabsProps {
  tabs: string[];
  activeTab?: string;
  badge?: { [key: string]: number };
}

withDefaults(defineProps<TabsProps>(), {
  tabs: () => [],
});

defineEmits(["select"]);
</script>

<template>
  <div class="">
    <div
      class="flex items-center gap-4 border-b-2 border-b-gray-400 dark:border-b-gray-500"
    >
      <h3
        v-for="tab in tabs"
        class="flex items-center gap-2 font-mono text-lg transition-all -mb-0.5"
        :class="{
          ' opacity-90 hover:opacity-70 cursor-pointer': activeTab !== tab,
          'font-bold border-b-2 ': activeTab === tab,
        }"
        @click="$emit('select', tab)"
      >
        {{ tab }}
        <div
          v-if="badge && badge[tab]"
          class="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
        >
          {{ badge[tab] }}
        </div>
      </h3>
    </div>

    <div class="mt-4 pl-4">
      <!-- <transition name-fade> -->
      <slot />
      <!-- </transition> -->
    </div>
  </div>
</template>
