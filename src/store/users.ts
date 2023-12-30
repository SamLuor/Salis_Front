import { defineStore } from 'pinia'
import { User } from '@/@types/user'
import { indexingBy } from '@/utils/transformData'

interface UserState {
  users: User[]
  indexingUsers: { [key: string]: User }
}
const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      users: [],
      indexingUsers: {}
    }
  },
  getters: {
    getUser: (state): User[] => {
      return state.users
    },
    getUserIndexing: (state) => {
      return state.indexingUsers
    }
  },
  actions: {
    setUsers(users: User[]) {
      this.users = users.map((user, index) => {
        return { ...user, index }
      })

      this.indexingUsers = indexingBy(this.users, 'id')
    },

    updateUser(item: User) {
      if (item.id) {
        const index = this.indexingUsers[item.id].index
        this.users[index!] = item
        this.indexingUsers[index!] = { ...item, index }
      }
    },

    deleteUser(id: string) {
      const index = this.indexingUsers[id].index
      this.users.splice(index!, 1)
      delete this.indexingUsers[id]
    }
  }
})

export default useUserStore
