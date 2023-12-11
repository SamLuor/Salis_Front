import SecureDataProcessorAdapter from '@/adapters/SecureDataProcessorAdapter'

class SecureDataProcessor extends SecureDataProcessorAdapter {
  constructor(secretKey: string) {
    super(secretKey)
  }

  encrypt(data: string) {
    return super.encrypt(data)
  }

  decrypt(encryptedData: string) {
    return super.decrypt(encryptedData)
  }
}

export default {
  dataProcessor: new SecureDataProcessor(import.meta.env.VITE_SECRET_KEY_CRYPT)
}
