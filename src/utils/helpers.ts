import { ZodError, ZodIssue, ZodSchema } from 'zod'
import type { Address } from '@/@types/addresses'
import type { Contact } from '@/@types/contacts'
import { clsx, type ClassValue } from 'clsx'

import { twMerge } from 'tailwind-merge'
import zod from 'zod'

const updateHtmlClass = (darkTheme: boolean) => {
  const htmlElement = document.documentElement

  if (darkTheme) {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
}

const buildAccessArchives = (domain: string, path: string): string => {
  return domain.split('/api').join(`/${path}`)
}

const destroyDomainInPath = (path: string) => {
  const urlName = path.split('/arquivos/')[1]
  return 'arquivos/'.concat(urlName)
}

const extractNameArchive = (url: string) => {
  return url.substring(url.lastIndexOf('/') + 1)
}

const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args))
}

const validityForm = (
  schema: ZodSchema,
  form: unknown
): { [key: string]: ZodIssue } => {
  let errors: { [key: string]: ZodIssue } = {}

  try {
    schema.parse(form)
  } catch (err) {
    if (err instanceof zod.ZodError) {
      errors = err.issues.reduce((acc: any, current) => {
        const key = current.path.join('-')
        acc[key] = current
        return acc
      }, {})
    }
  }
  return errors
}

const validitySchemaArray = (schema: ZodSchema, value: object): object[] => {
  const errors: any[] = []

  try {
    schema.parse(value)
  } catch (err) {
    if (err instanceof ZodError) {
      err.issues.forEach((item) => {
        let [index, field] = item.path
        if (typeof index !== 'number') [field, index] = item.path

        errors[+index] = {
          ...errors[+index],
          [field]: item
        }
      })
    }
    return errors
  }
  return errors
}

const createStructureContactFormData = (
  formData: FormData,
  contacts: Contact[]
) => {
  contacts.forEach((contact, index) => {
    formData.append(`telefones[${index}][ddd]`, String(contact.ddd))
    formData.append(`telefones[${index}][numero]`, String(contact.numero))
    formData.append(`telefones[${index}][pessoa]`, contact.pessoa)
  })
}

const createStructureAddressFormData = (
  formData: FormData,
  addresses: Address[]
) => {
  addresses.forEach((address, index) => {
    formData.append(`enderecos[${index}][cep]`, address.cep)
    formData.append(
      `enderecos[${index}][logradouro]`,
      address.logradouro + ' - ' + address.cidade
    )
    formData.append(`enderecos[${index}][numero]`, address.numero)
    formData.append(`enderecos[${index}][bairro]`, address.bairro)
    formData.append(`enderecos[${index}][complemento]`, address.complemento)
  })
}

const deepClone = (object: object) => {
  return JSON.parse(JSON.stringify(object))
}

export {
  updateHtmlClass,
  buildAccessArchives,
  extractNameArchive,
  destroyDomainInPath,
  cn,
  validityForm,
  deepClone,
  validitySchemaArray,
  createStructureContactFormData,
  createStructureAddressFormData
}
