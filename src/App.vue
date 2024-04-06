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
    label: 'Configurações',
    icon: 'pi pi-fw pi-sitemap',
    items: [
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
        to: '/cargos'
      },
      {
        label: 'Setor de Produtos',
        icon: 'fa-solid fa-briefcase',
        to: '/setor_produto'
      },
      {
        label: 'Clientes',
        icon: 'fa-solid fa-users',
        to: '/clientes',
        role: 'gerenciar clientes'
      },
      {
        label: 'Meios de Publicação',
        icon: 'fa-solid fa-users',
        to: '/meios-publicacao',
        role: 'gerenciar meios de publicação'
      }
    ].filter((route) => {
      return authStore.user.permissions.some(
        (role) => role.nome === route.role || !route?.role
      )
    })
  },
  {
    label: 'Processo',
    icon: 'pi pi-fw pi-sitemap',
    items: [
      {
        label: 'Processos',
        icon: 'fa-solid fa-users',
        to: '/publicacoes'
      }
    ].filter((route: ItemMenu) => {
      return authStore.user.permissions.some(
        (role) => role.nome === route?.role || !route?.role
      )
    })
  }
]

interface ItemMenu {
  label: string
  icon: string
  to: string
  role?: string // A propriedade 'role' é opcional
}

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
