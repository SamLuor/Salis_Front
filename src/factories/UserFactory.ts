import { UserMe } from '@/@types/auth'
import { UserAuth } from '@/store/@types/Auth'

export const UserFactory = (user: UserMe): UserAuth => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    permissions: user.permissoes,
    positions: user.cargos
  }
}
