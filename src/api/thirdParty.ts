import { handleError } from '@/utils/handleErrors'
import axios from 'axios'

export class ThirdPartyServices {
  async viaCep(cep: string) {
    return await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        handleError(err, 'Erro na API de integração.')
      })
  }
}
