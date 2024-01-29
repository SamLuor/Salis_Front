<script setup lang="ts">
const props = defineProps({
  status: {
    type: Number,
    required: true
  },
  isCurrent: {
    type: Boolean,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['changeStatus'])
</script>

<template>
  <div
    class="card-step"
    :style="{
      cursor: isCompleted ? 'pointer' : 'default'
    }"
    @click="
      () => {
        if (isCompleted) emit('changeStatus', props.status)
      }
    "
  >
    <span
      :class="[
        'container-icon-step',
        { 'bg-green-500': isCompleted },
        { 'bg-yellow-500': isCurrent },
        { 'bg-gray-500': !isCurrent && !isCompleted }
      ]"
    >
      <!-- <div class="block-active"></div> -->
      <i :class="['icon-step', props.icon]"
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
  @apply w-[100px] h-full rounded-[6px] text-white grid place-items-center text-2xl duration-300 transition-all relative overflow-hidden;
}

.block-active {
  @apply bg-white w-full h-full translate-x-[70px];
}

.left {
  transform: translateX(70px);
}

.right {
  transform: translateX(70px);
}

.icon-step {
  @apply absolute;
}

.card-step .container-text-step {
  @apply flex flex-col pl-3 w-full justify-center h-full border border-solid border-l-transparent rounded-r-lg border-gray-300 text-light-black70 dark:text-dark-white70;
}
</style>
