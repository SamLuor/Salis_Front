import * as CryptoJS from 'crypto-js'

export default class SecureDataProcessorAdapter {
  constructor(private readonly secretKey: string) {
    if (!secretKey) {
      throw new Error('A chave secreta é obrigatória.')
    }
  }

  private encryptData(data: string) {
    const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString()
    return encryptedData
  }

  private decryptData(encryptedData: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
  }

  encrypt(data: string) {
    const encryptedData = this.encryptData(data)
    return encryptedData
  }

  decrypt(encryptedData: string) {
    const decryptedData = this.decryptData(encryptedData)
    return decryptedData
  }
}
