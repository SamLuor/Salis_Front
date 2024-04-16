<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2
    v-if="variant === 'subtitle'"
    :class="cn(defaultTitleClasses, titleClass)"
  >
    {{ title }}
  </h2>
  <h1 v-else :class="cn(defaultTitleClasses, titleClass)">{{ title }}</h1>
</template>

<script setup lang="ts">
import { cn } from '@/utils/helpers'

interface Props {
  variant?: 'title' | 'subtitle'
  title: string
  titleClass?: string
}

defineProps<Props>()

const defaultTitleClasses = 'font-bold'
</script>

<style scoped>
h1 {
  @apply text-2xl;
}
h2 {
  @apply text-xl !important;
}
</style>
