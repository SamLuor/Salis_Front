<script lang="ts" setup>
import LogoImage from '@/components/LogoImage.vue'
import { useAuthStore } from '@/store/auth'
</script>

<template>
  <div class="layout-footer">
    <LogoImage height="20" class="mr-2" />
    <span class="text-footer">{{ useAuthStore().user.name }}</span>
  </div>
</template>

<style>
.text-footer {
  @apply text-light-gray dark:text-dark-gray !important;
}
</style>
