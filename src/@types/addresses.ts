import { ZodIssue } from 'zod'

export interface Address {
  cep: string
  numero: string
  bairro: string
  logradouro: string
  complemento: string
  cidade: string
}

export interface ErrorsAddress {
  cep?: ZodIssue
  numero?: ZodIssue
  bairro?: ZodIssue
  logradouro?: ZodIssue
  complemento?: ZodIssue
  cidade?: ZodIssue
}
