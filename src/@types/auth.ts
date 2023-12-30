import { GenericResponse } from './generics'

export interface UserMe {
  id: string
  name: string
  email: string
  cargos: Positions[]
  permissoes: Permiss[]
}

export interface Positions {
  id: string
  nome: string
}

export interface Permiss {
  id: string
  nome: string
}

export interface UserMeResponse extends GenericResponse {
  data: UserMe
}

export interface AuthProtocol {
  login({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<{ data: { access_token: string }; message: string }>
  getMe(): Promise<UserMeResponse>
}
