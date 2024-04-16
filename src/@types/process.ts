import { BaseItem, Group } from './term_reference'

export interface Edital {
  id: string
  processo_id: string
  modalidade_id: string
  regime_id: string
  tipo_execucao_id: any
  modo_disputa_id: string
  julgamento_id: any
  numero: string
  periodico: number
  portal_compra_id: string
  numero_portal_compra: string
  numero_p_a: string
  pregoeiro: string
  descricao_completa_objeto: string
  descricao_simplificada_objeto: string
  inicio_acolhimento_proposta: string
  limite_acolhimento_proposta: string
  abertura_proposta: string
  data_disputa: string
  caminho_arquivo: string
  modalidade: {
    id: string
    nome: string
    tipo_processo_id: string
  }
  regime: {
    id: string
    nome: string
  }
  tipo_execucao: any
  modo_disputa: {
    id: string
    nome: string
  }
  julgamento: null | { id: string; nome: string }
  clientes: Array<{
    id: string
    razao_social: string
    nome_fantasia: string
    sigla: string
    cnpj: string
    email: string
  }>
  anexos: Array<any>
}

export interface BaseItemProtocol {
  id: string
  numero: string
  quantidade: number
  produto_item_id: string
  termo_referencia_id: string
  grupo_id: any
  produto_item: {
    id: string
    descricao_simplificada: string
    descricao_completa: string
    produto_id: string
    unidade_medida_id: string
    produto: {
      id: string
      nome: string
    }
    unidade_medida: {
      id: string
      nome: string
    }
  }
  valor: number
}

export interface Termo_Referencia {
  id: string
  nome: any
  caminho_arquivo: string
  validade_proposta: string
  prazo_entrega: string
  prazo_garantia_produto: string
  validade_assinatura_arp: number
  validade_publicacao_arp: number
  processo_id: string
  processo: {
    id: string
    codigo: string
    tipo_processo_id: string
  }
  setor_produtos: Array<{
    id: string
    nome: string
  }>
  subseguinte_comerciais: Array<{
    id: string
    nome: string
  }>
  grupos: Array<{
    id: string
    numero: string
    termo_referencia_id: string
    itens: Array<{
      id: string
      numero: string
      quantidade: number
      produto_item_id: string
      termo_referencia_id: any
      grupo_id: string
      produto_item: {
        id: string
        descricao_simplificada: string
        descricao_completa: string
        produto_id: string
        unidade_medida_id: string
        produto: {
          id: string
          nome: string
        }
        unidade_medida: {
          id: string
          nome: string
        }
      }
    }>
  }>
  itens: Array<{
    id: string
    numero: string
    quantidade: number
    produto_item_id: string
    termo_referencia_id: string
    grupo_id: any
    produto_item: {
      id: string
      descricao_simplificada: string
      descricao_completa: string
      produto_id: string
      unidade_medida_id: string
      produto: {
        id: string
        nome: string
      }
      unidade_medida: {
        id: string
        nome: string
      }
    }
  }>
}

export interface Termo_Referencia_Form {
  id?: string
  arquivo: any
  caminho_arquivo: string
  setor_produtos: string[]
  subseguinte_comerciais: string[]
  validade_proposta: Date | null
  prazo_entrega: Date | null
  prazo_garantia_produto: Date | null
  validade_assinatura_arp?: number | null
  validade_publicacao_arp?: number | null
}

export interface Empresa {
  id: string
  razao_social: string
  nome_fantasia: string
  sigla: string
  cnpj: string
  email: string
  logo_img_path: any
  frase: string
}

export type Publicacoes = Array<{
  id: string
  date: string
  file_path: string
  cliente_id: string
  meio_publicacao_id: string
  processo_id: string
  cliente: {
    id: string
    razao_social: string
    nome_fantasia: string
    sigla: string
    cnpj: string
    email: string
  }
  meioPublicacao: {
    id: string
    nome: string
  }
}>

export type Processo = {
  id: string
  codigo: string
  tipo_processo_id: string
  empresa: Empresa
  publicacoes: Publicacoes
  tipo: {
    id: string
    nome: string
  }
  edital: Edital
  termo_referencia: Termo_Referencia
}
