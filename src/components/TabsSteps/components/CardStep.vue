<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  status: number
  statusProcess: number
  header: string
  description: string
  icon?: string
}>()
const emit = defineEmits(['changeStatus'])

const completed = ref(props.status < props.statusProcess)
const current = ref(props.status === props.statusProcess)
</script>

<template>
  <div
    class="card-step"
    :style="{
      cursor: props.statusProcess >= props.status ? 'pointer' : 'default'
    }"
    @click="
      () => {
        if (props.statusProcess >= props.status)
          emit('changeStatus', props.status)
      }
    "
  >
    <span
      :class="[
        'container-icon-step',
        { 'bg-green-500': completed },
        { 'bg-yellow-500': current },
        { 'bg-gray-500': !current && !completed }
      ]"
      ><i :class="props.icon"
    /></span>
    <div class="container-text-step">
      <p class="font-semibold mb-0">{{ props.header }}</p>
      <p class="text-sm text-gray-600">{{ props.description }}</p>
    </div>
  </div>
</template>

<style>
.card-step {
  @apply rounded-lg relative flex items-center border-gray-200 shadow-sm w-[250px] min-h-[70px] pr-2 bg-background-light-white70 dark:bg-background-dark-blue70;
}
.card-step .container-icon-step {
  box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.1);
  @apply w-[100px] h-full rounded-[6px] text-white grid place-items-center text-2xl;
}
.card-step .container-text-step {
  @apply flex flex-col pl-3 w-full justify-center h-full border border-solid border-l-transparent rounded-r-lg border-gray-300 text-light-black70 dark:text-dark-white70;
}
</style>
