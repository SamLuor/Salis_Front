import { defineStore } from 'pinia'
import { updateHtmlClass } from '@/utils/helpers'

interface ThemeState {
  darkTheme: boolean
  menuClick: boolean
  staticMenuInactive: boolean
  overlayMenuActive: boolean
  mobileMenuActive: boolean
  layoutMode: string
}
export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => {
    return {
      darkTheme: localStorage.getItem('@salis:theme') == 'dark' ? true : false,
      menuClick: false,
      layoutMode: 'static',
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false
    }
  },
  getters: {
    isDarkTheme: (state) => {
      updateHtmlClass(state.darkTheme)
      return state.darkTheme
    }
  },
  actions: {
    toggleThemeColor() {
      this.darkTheme = !this.darkTheme
      localStorage.setItem('@salis:theme', this.darkTheme ? 'dark' : 'light')
      updateHtmlClass(this.darkTheme)
    }
  }
})
