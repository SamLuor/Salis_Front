<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ data: any }>()
</script>

<template>
  <div class="container-development">
    <div
      class="grid grid-cols-2 place-items-center gap-2 text-lg font-semibold"
    >
      <div
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <i class="fa-solid fa-gear text-4xl text-gray-700 pi-spin" />
      </div>
      <span
        >Em <br />
        Desenvolvimento
      </span>
    </div>
  </div>
</template>

<style>
.container-development {
  @apply w-full h-[500px] grid place-items-center;
}
</style>
