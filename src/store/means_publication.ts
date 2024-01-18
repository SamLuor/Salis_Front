import { defineStore } from 'pinia'
import { indexingBy } from '@/utils/transformData'
import { MeansPublicationProtocol } from '@/@types/means_publication'

interface MeansPublicationState {
  means: MeansPublicationProtocol[]
  indexingMeans: { [key: string]: MeansPublicationProtocol }
}
const useMeansPublicationStore = defineStore({
  id: 'means_publication',
  state: (): MeansPublicationState => {
    return {
      means: [],
      indexingMeans: {}
    }
  },
  getters: {
    getMeans: (state): MeansPublicationProtocol[] => {
      return state.means
    },
    getMeansIndexing: (state) => {
      return state.indexingMeans
    }
  },
  actions: {
    setMeans(means: MeansPublicationProtocol[]) {
      this.means = means.map((mean, index) => {
        return { ...mean, index }
      })

      this.indexingMeans = indexingBy(this.means, 'id')
    },

    updateMean(item: MeansPublicationProtocol) {
      if (item.id) {
        const index = this.indexingMeans[item.id].index
        this.means[index!] = item
        this.indexingMeans[index!] = { ...item, index }
      }
    },

    deleteMean(id: string) {
      const index = this.indexingMeans[id].index
      this.means.splice(index!, 1)
      delete this.indexingMeans[id]
    }
  }
})

export default useMeansPublicationStore
