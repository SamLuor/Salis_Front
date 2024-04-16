import { ZodIssue } from 'zod'

export interface Publications {
  processo: { tipo_processo_id: string }
  publicacoes: Publication[]
}

export interface PublicationProtocol {
  index?: number
  id?: string
  date: string | Date
  file?: string
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

export interface PublicationProcess {
  processo: { tipo_processo_id: string }
  publicacoes: Publication[]
}

export interface Publication {
  id?: string
  cliente_id: string
  date: string | Date
  file: any
  meio_publicacao_id: string
  file_path: string | null
}

export interface ErrorPublicationProcess {
  processo: {
    tipo_processo_id: ZodIssue
  }
}

export interface ErrorsPublication {
  date?: ZodIssue
  file?: ZodIssue
  cliente_id?: ZodIssue
  meio_publicacao_id?: ZodIssue
}
