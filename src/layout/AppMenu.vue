<template>
  <div class="layout-menu-container">
    <router-link
      to="/"
      class="w-full h-full flex mb-4"
      style="justify-content: center"
    >
      <LogoImage style="width: 100px" :width-image="100" />
      <p class="text-logo"></p>
    </router-link>
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
      @keydown="onKeyDown"
    />
  </div>
</template>

<script lang="ts" setup>
import AppSubmenu from '@/layout/AppSubmenu.vue'
import LogoImage from '@/components/LogoImage.vue'

defineProps({ model: Array })
const emit = defineEmits(['menuitem-click'])
const onMenuItemClick = (event: any) => {
  emit('menuitem-click', event)
}
const onKeyDown = (event: any) => {
  const nodeElement = event.target
  if (event.code === 'Enter' || event.code === 'Space') {
    nodeElement.click()
    event.preventDefault()
  }
}
</script>
