import { defineStore } from 'pinia'
import { indexingBy } from '@/utils/transformData'
import { PublicationProtocol } from '@/@types/publication'

interface PublicationState {
  publications: PublicationProtocol[]
  indexingPublications: { [key: string]: PublicationProtocol }
}
const usePublicationStore = defineStore({
  id: 'publication',
  state: (): PublicationState => {
    return {
      publications: [],
      indexingPublications: {}
    }
  },
  getters: {
    getPublications: (state): PublicationProtocol[] => {
      return state.publications
    },
    getPublicationsIndexing: (
      state
    ): { [key: string]: PublicationProtocol } => {
      return state.indexingPublications
    }
  },
  actions: {
    setPublication(publications: PublicationProtocol[]) {
      this.publications = publications.map((publication, index) => {
        return { ...publication, index }
      })

      this.indexingPublications = indexingBy(this.publications, 'id')
    },

    updatePublication(item: PublicationProtocol) {
      if (item.id) {
        const index = this.indexingPublications[item.id].index
        this.publications[index!] = item
        this.indexingPublications[index!] = { ...item, index }
      }
    },

    deletePublication(id: string) {
      const index = this.indexingPublications[id].index
      this.publications.splice(index!, 1)
      delete this.indexingPublications[id]
    }
  }
})

export default usePublicationStore
