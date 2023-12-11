<template>
  <div class="layout-menu-container">
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
