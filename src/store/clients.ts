import { defineStore } from 'pinia'
import { indexingBy } from '@/utils/transformData'
import { ClientProtocol } from '@/@types/client'

interface ClientState {
  clients: ClientProtocol[]
  indexingClients: { [key: string]: ClientProtocol }
}
const useClientStore = defineStore({
  id: 'client',
  state: (): ClientState => {
    return {
      clients: [],
      indexingClients: {}
    }
  },
  getters: {
    getClients: (state): ClientProtocol[] => {
      return state.clients
    },
    getClientsIndexing: (state) => {
      return state.indexingClients
    }
  },
  actions: {
    setClients(clients: ClientProtocol[]) {
      this.clients = clients.map((client, index) => {
        return { ...client, index }
      })

      this.indexingClients = indexingBy(this.clients, 'id')
    },

    updateClient(item: ClientProtocol) {
      if (item.id) {
        const index = this.indexingClients[item.id].index
        this.clients[index!] = item
        this.indexingClients[index!] = { ...item, index }
      }
    },

    deleteClient(id: string) {
      const index = this.indexingClients[id].index
      this.clients.splice(index!, 1)
      delete this.indexingClients[id]
    }
  }
})

export default useClientStore
