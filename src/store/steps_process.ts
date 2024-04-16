import { defineStore } from 'pinia'

interface StoreTypesState {
  accessGranted: number | null
  currentAccess: number | null
}

export const useStepProcessStore = defineStore({
  id: 'step-process',
  state: (): StoreTypesState => {
    return {
      accessGranted: -0,
      currentAccess: 0
    }
  },
  actions: {
    changeAccessGranted(numStage: number) {
      if (isNaN(numStage)) return
      this.accessGranted = numStage
    },
    changeCurrentAccess(numSelected: number) {
      if (isNaN(numSelected)) return
      this.currentAccess = numSelected
    }
  }
})
