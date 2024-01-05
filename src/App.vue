<template>
  <div
    class="layout-wrapper container"
    :class="containerClass"
    @click="onWrapperClick"
  >
    <AppTopbar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar sub-container" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <AppFooter />
    </div>
    <!-- <AppConfig
      :layout-mode="store.layoutMode"
      @layout-change="onLayoutChange"
    /> -->
    <transition name="layout-mask">
      <div
        v-if="store.mobileMenuActive"
        class="layout-mask p-component-overlay"
      ></div>
    </transition>
  </div>
  <Toast position="bottom-right" />
</template>
<script lang="ts" setup>
import whiteLogo from '@/assets/img/logo-white.svg'
import darkLogo from '@/assets/img/logo-dark.svg'
import AppTopbar from '@/layout/AppTopbar.vue'
import { computed, getCurrentInstance } from 'vue'
import AppMenu from '@/layout/AppMenu.vue'
import AppConfig from '@/layout/AppConfig.vue'
import AppFooter from '@/layout/AppFooter.vue'
import Toast from 'primevue/toast'
import { useThemeStore } from '@/store/theme'
import { useToastRef } from './store/features'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from './store/auth'

const app = getCurrentInstance()
const store = useThemeStore()
const toast = useToast()

store.menuClick = true

const authStore = useAuthStore()

const menu = [
  /* {
    label: 'Home',
    items: [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        to: '/dashboard'
      }
    ]
  }, */
  {
    label: 'Configurações de Acessos',
    icon: 'pi pi-fw pi-sitemap',
    items: [
      { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
      { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
      { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
      {
        label: 'Invalid State',
        icon: 'pi pi-fw pi-exclamation-circle',
        to: '/invalidstate'
      },
      { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button' },
      {
        label: 'Usuários',
        icon: 'pi pi-fw pi-users',
        to: '/',
        role: 'gerenciar usuários'
      },
      {
        label: 'Empresas',
        icon: 'pi pi-fw pi-building',
        to: '/empresas',
        role: 'gerenciar empresas'
      },
      {
        label: 'Cargos',
        icon: 'fa-solid fa-briefcase',
        to: '/cargos',
        role: 'gerenciar cargos'
      },
      { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
      { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
      { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
      { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
      { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },
      { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
      { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
      { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
      { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
      { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' }
    ].filter((route) => {
      return authStore.user.permissions.some((role) => role.nome === route.role)
    })
  }
]
const containerClass = computed(() => {
  return {
    'layout-overlay': store.layoutMode === 'overlay',
    'layout-static': store.layoutMode === 'static',
    'layout-static-sidebar-inactive':
      store.staticMenuInactive && store.layoutMode === 'static',
    'layout-overlay-sidebar-active':
      store.overlayMenuActive && store.layoutMode === 'overlay',
    'layout-mobile-sidebar-active': store.mobileMenuActive,
    'p-input-filled':
      app?.appContext.config.globalProperties.$primevue.config.inputStyle ===
      'filled',
    'p-ripple-disabled':
      app?.appContext.config.globalProperties.$primevue.config.ripple === false
  }
})

defineEmits(['change-theme'])
const onMenuToggle = () => {
  store.menuClick = true

  if (isDesktop()) {
    if (store.layoutMode === 'overlay') {
      if (store.mobileMenuActive === true) {
        store.overlayMenuActive = true
      }

      store.overlayMenuActive = !store.overlayMenuActive
      store.mobileMenuActive = false
    } else if (store.layoutMode === 'static') {
      store.staticMenuInactive = !store.staticMenuInactive
    }
  } else {
    store.mobileMenuActive = !store.mobileMenuActive
  }

  // preventDefault()
}
const onWrapperClick = () => {
  if (!store.menuClick) {
    store.overlayMenuActive = false
    store.mobileMenuActive = false
  }

  store.menuClick = false
}
const isDesktop = () => {
  return window.innerWidth >= 992
}
const onSidebarClick = () => {
  store.menuClick = true
}
const logo = computed(() => {
  return store.darkTheme ? whiteLogo : darkLogo
})
const onMenuItemClick = (event: any) => {
  if (event.item && !event.item.items) {
    store.overlayMenuActive = false
    store.mobileMenuActive = false
  }
}
const onLayoutChange = (layoutMode: string) => {
  store.layoutMode = layoutMode
}
</script>

<style lang="scss">
.p-toast.p-toast-top-right {
  z-index: 1000;
  top: 7rem;
}
</style>
