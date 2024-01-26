export interface Publications {
  publicacoes: PublicationProtocol[]
}

export interface PublicationProtocol {
  index?: number
  id?: string
  date: string
  file: string
  file_path?: string
  cliente_id: string
  meio_publicacao_id: string
}

export interface CreatePublications {
  publicacoes: Omit<PublicationProtocol, 'id' | 'index'>
}

export interface UpdatePublications {
  publicacoes: Omit<PublicationProtocol, 'id'>
}
