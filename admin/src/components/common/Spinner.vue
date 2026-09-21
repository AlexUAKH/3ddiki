<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  height: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 24,
});

const styles = computed(() => {
  return { height: `${props.height}px` };
});
</script>

<template>
  <div class="spinner-box" :style="styles">
    <div class="circle-border">
      <div class="circle-core"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
.spinner-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.circle-border {
  width: 100px;
  height: 100px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(
    0deg,
    rgba(63, 249, 220, 0.1) 33%,
    rgba(63, 249, 220, 1) 100%
  );
  animation: spin 0.8s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 50%;
}
</style>
