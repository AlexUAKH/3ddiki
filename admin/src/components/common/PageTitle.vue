<script setup lang="ts">
interface Props {
  icon: string;
  header: string;
  hiddenBorderBottom?: boolean;
}

withDefaults(defineProps<Props>(), {
  icon: "mdi-home",
  hiddenBorderBottom: false,
});
</script>

<template>
  <div
    flat
    class="page-title"
    :class="{ hide_border_bottom: hiddenBorderBottom }"
  >
    <div class="d-flex align-center title me-6">
      <v-icon size="small" class="mr-3">{{ icon }}</v-icon>
      {{ header }}
    </div>

    <div class="actions d-flex align-center">
      <slot v-if="$slots.default" />

      <slot v-if="$slots.actions" name="actions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-title {
  padding: 6px;
  border-bottom: 2px solid #a3a3a3;
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: none !important;
  border-radius: 0;
  & .actions {
    flex-grow: 1;
  }
}
.hide_border_bottom {
  border-bottom: unset;
}
.title {
  flex-wrap: nowrap;
  // white-space: nowrap;
  // word-break: break-all;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.0125em;
  line-height: 2rem;
}
</style>
