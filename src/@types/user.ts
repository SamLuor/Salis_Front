import { CompanyProtocol } from './company'

export interface User {
  id?: string
  name: string
  email: string
  password?: string
  index?: number
  empresas: CompanyProtocol[]
}

interface GetUsersResponse {
  data: User[]
  message: string
}

export interface UserProtocol {
  getUsers(): Promise<GetUsersResponse>
}
