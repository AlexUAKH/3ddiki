<script setup lang="ts">
interface ModalProps {
  cardClass?: string;
}

defineProps<ModalProps>();
defineEmits(["close"]);
</script>

<template>
  <AppOverlay>
    <div class="h-full flex justify-center items-center">
      <AppCard @close="$emit('close')" :class="cardClass || ''">
        <slot />
      </AppCard>
    </div>
  </AppOverlay>
</template>
