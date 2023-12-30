import type { AxiosInstance } from 'axios'
import { handleError } from '@/utils/handleErrors'
import { User, UserProtocol } from '@/@types/user'
import useUserStore from '@/store/users'

export default class UserService implements UserProtocol {
  constructor(private readonly httpConfig: AxiosInstance) {}

  async createUser(data: User) {
    const store = useUserStore()

    return await this.httpConfig
      .post('/user', data)
      .then((response) => {
        store.setUsers([...store.users, response.data.data])
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async getUsers() {
    const store = useUserStore()

    return await this.httpConfig
      .get('/user')
      .then((response) => {
        store.setUsers(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async deleteUser(data: User) {
    const store = useUserStore()

    await this.httpConfig
      .delete('/user/' + data.id)
      .then((response) => {
        store.deleteUser(data?.id ?? '')
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async updateUser(data: Partial<User>) {
    const store = useUserStore()

    await this.httpConfig
      .patch('/user/' + data.id, data)
      .then((response) => {
        store.updateUser(response.data.data)
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }

  async vinculationUserInCompany(data: Partial<User>) {
    await this.httpConfig
      .patch('/user', data)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        const { message } = err.response.data
        handleError(err, message)
      })
  }
}
