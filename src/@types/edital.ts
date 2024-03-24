import { FieldObject } from './generics'

export interface EditalProtocol {
  id?: string
  licitationType: string
  contractRegime: string
  executionType: string
  disputeMode: string
  judgmentCriteria: string
  editalNumber: number | null
  isPeriodic: string
  purchasingPortal: string
  licitationNumber: number | null
  contractingAuthorities: {
    value: string
    sigla: string
    uasg: string
  }[]
  administrativeProcessNumber: number | null
  pregoeiro: string
  completeObjectDescription: string
  simplifiedObjectDescription: string
  startProposalReception: Date | null
  limitProposalReception: Date | null
  openingProposal: Date | null
  disputeDateTime: Date | null
  fullEdition: Date | null
  archive: any
  otherAttachments: OtherAttachment
}

interface OtherAttachment {
  add: any[]
  remove: string[]
  current: AttachmentCurrent[]
}

interface AttachmentCurrent {
  id: string
  caminho: string
}

export interface Data {
  modalidade_id: string | null
  regime_id: string | null
  tipo_execucao_id: string | null
  modo_disputa_id: string | null
  julgamento_id: string | null
  numero: string | null
  periodico: string | null
  portal_compra_id: string | null
  numero_portal_compra: string | null
  numero_p_a: string | number
  pregoeiro: string | null
  descricao_completa_objeto: string | null
  descricao_simplificada_objeto: string | null
  inicio_acolhimento_proposta: string | null
  limite_acolhimento_proposta: string | null
  abertura_proposta: string | null
  data_disputa: string | null
  clientes: string[] | null
  arquivo: any
  anexos: {
    add: string[]
    remove: string[]
  }
}

export interface Anexos {
  add: FieldObject[]
  remove: FieldObject[]
}

export interface ErrorsEditalInterface {
  modalidade_id: FieldObject
  regime_id: FieldObject
  tipo_execucao_id: FieldObject
  modo_disputa_id: FieldObject
  julgamento_id: FieldObject
  numero: FieldObject
  periodico: FieldObject
  portal_compra_id: FieldObject
  numero_portal_compra: FieldObject
  numero_p_a: FieldObject
  pregoeiro: FieldObject
  descricao_completa_objeto: FieldObject
  descricao_simplificada_objeto: FieldObject
  inicio_acolhimento_proposta: FieldObject
  limite_acolhimento_proposta: FieldObject
  abertura_proposta: FieldObject
  data_disputa: FieldObject
  clientes: FieldObject[]
  arquivo: FieldObject
  anexos: Anexos
}
