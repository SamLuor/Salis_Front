import { defineStore } from 'pinia'
import type { ToastServiceMethods } from 'primevue/toastservice'

interface ToastStore {
  toast: null | ToastServiceMethods
}

export const useToastRef = defineStore({
  id: 'toastRef',
  state: (): ToastStore => {
    return {
      toast: null
    }
  },
  getters: {
    useToast: (state) => state.toast
  },
  actions: {
    setToast(refToast: ToastServiceMethods) {
      this.toast = refToast
    }
  }
})
