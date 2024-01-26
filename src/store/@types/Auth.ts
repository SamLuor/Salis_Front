import { Permiss, Positions } from '@/@types/auth'

export interface UserAuth {
  id: string
  name: string
  email: string
  permissions: Permiss[]
  positions: Positions[]
}

export interface MainState {
  user: UserAuth
  token: null | string
  roles: string[] | null
  options_company: [{ text: string; value: string }] | []
  company_id: string | null
}
