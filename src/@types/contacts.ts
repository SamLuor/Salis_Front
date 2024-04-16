import { ZodIssue } from 'zod'

export interface Contact {
  ddd: number | null
  numero: number | null
  pessoa: string
}

export interface ErrorsContact {
  ddd: ZodIssue
  numero: ZodIssue
  pessoa: ZodIssue
}
