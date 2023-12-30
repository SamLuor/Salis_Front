<template>
  <Button class="p-link layout-topbar-button" @click="toggleMenu">
    <i class="pi pi-user"></i>
    <span>Profile</span>
  </Button>
  <!-- Menu -->
  <Menu
    id="overlay_menu"
    ref="menu"
    :model="props.config.items"
    class="w-full md:w-15rem"
    :popup="true"
  >
    <template #submenuheader="{ item }">
      <span class="font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="flex align-items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <button
        v-ripple
        class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
      >
        <span class="inline-flex flex-column">
          <span class="font-bold text">{{ props.config.end.name }}</span>
          <span class="text-sm subtext">{{ props.config.end.subname }}</span>
        </span>
      </button>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu'
import { ref } from 'vue'

const props = defineProps(['config'])
const menu = ref<Menu | null>(null)

const toggleMenu = (event: Event) => {
  menu.value?.toggle(event)
}
</script>
