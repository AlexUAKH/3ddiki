<script setup lang="ts"></script>

<template>
  <Overlay>
    <div class="h-full flex items-center justify-center">
      <div class="relative w-full max-w-lg border rounded-xl p-4">
        <div class="absolute right-2 top-2">
          <Icon name="mdi:close" class="size-6 cursor-pointer" />
        </div>
        <div class="text-center font-serif text-xl font-semibold">Login</div>

        <form class="mt-4">
          <input class="h-8 border rounded-md" />
        </form>
      </div>
    </div>
  </Overlay>
</template>
