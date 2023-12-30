<script lang="ts" setup>
import MenuUser from '@/components/MenuUser.vue'
import { useThemeStore } from '@/store/theme'
import { computed, ref } from 'vue'
import LogoImage from '@/components/LogoImage.vue'
import LogoSalis from '@/assets/logo-fit.png'
import { useAuthStore } from '@/store/auth'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const emit = defineEmits(['menu-toggle', 'topbar-menu-toggle'])
const onMenuToggle = (event: any) => {
  emit('menu-toggle', event)
}
const tooltipConfig = computed(() => ({
  value: themeStore.isDarkTheme ? 'Dark Mode' : 'Light Mode',
  pt: {
    text: 'font-medium bg-primary'
  }
}))
const config = ref({
  items: [
    {
      separator: true
    },
    {
      label: 'Perfil',
      items: [
        {
          label: 'Sair',
          icon: 'pi pi-sign-out',
          command: () => {
            authStore.logout()
          }
        }
      ]
    },
    {
      separator: true
    }
  ],
  header: {
    logo: LogoSalis,
    text: 'SALISAPP'
  },
  end: {
    name: authStore.user.name,
    subname: authStore.user.positions[0].nome
  }
})
</script>
<template>
  <div
    class="layout-topbar container-header"
    :class="[{ active: themeStore.staticMenuInactive }]"
  >
    <Button
      class="p-link toggle-side layout-menu-button layout-topbar-button bg-transparent"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click.prevent="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </Button>
    <Button
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true
      }"
      class="p-link layout-topbar-menu-button layout-topbar-button bg-transparent"
    >
      <i class="pi pi-ellipsis-v"></i>
    </Button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <Button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </Button>
      </li>
      <li>
        <Button class="p-link layout-topbar-button">
          <i class="pi pi-envelope"></i>
          <span>Events</span>
        </Button>
      </li>
      <li>
        <MenuUser :config="config" />
      </li>
    </ul>
    <Button
      v-tooltip.left="tooltipConfig"
      class="button-toggle-dark"
      @click="themeStore.toggleThemeColor"
    >
      <i
        :class="[
          'text-lg pi',
          { 'text-700 pi-sun': !themeStore.isDarkTheme },
          { 'text-100 pi-moon': themeStore.isDarkTheme }
        ]"
      />
    </Button>
  </div>
</template>
