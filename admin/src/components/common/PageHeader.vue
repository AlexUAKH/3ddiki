<script setup lang="ts">
import { BACK_ICON } from "@/constants/iconsMap";
import { useI18n } from "vue-i18n";

interface Props {
  icon?: string;
  header: string;
  hiddenBorderBottom?: boolean;
  showBack?: boolean;
}

withDefaults(defineProps<Props>(), {
  icon: "mdi-home",
  hiddenBorderBottom: false,
});

defineEmits(["back"]);

const { t } = useI18n();
</script>

<template>
  <div class="page-title" :class="{ hide_border_bottom: hiddenBorderBottom }">
    <div class="d-flex align-center title me-6">
      <div v-if="showBack" class="mr-4 hover" @click="$emit('back')">
        <v-icon>{{ BACK_ICON }}</v-icon>
        <!-- <div class="">{{ t("common.back") }}</div> -->
      </div>

      <v-icon v-if="icon" size="small" class="mr-3">{{ icon }}</v-icon>
      {{ header }}
    </div>

    <div class="d-flex align-center grow">
      <slot v-if="$slots.default" />
    </div>
    <div class="actions">
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
  flex-direction: column;
  // justify-content: stretch;
  flex-wrap: wrap;
  gap: 8px;
  align-items: stretch;
  box-shadow: none !important;
  border-radius: 0;
  & .actions {
    // flex-grow: 1;
    margin-left: auto;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
