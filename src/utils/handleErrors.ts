import type { AxiosError } from 'axios'
import axios from 'axios'

const handleError = (error: Error | AxiosError, message: string): Error => {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 401:
        throw new Error('Unauthorized')
      case 422:
        throw new Error('Não foi possível processar o conteúdo!')
      case 403:
        throw new Error('Usuário não tem as devidas permissões')
      default:
        throw new Error(message)
    }
  }
  throw new Error(message)
}

export { handleError }
