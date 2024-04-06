import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ZodError, ZodErrorMap, ZodIssue, ZodSchema } from 'zod'
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

export {
  updateHtmlClass,
  buildAccessArchives,
  extractNameArchive,
  destroyDomainInPath,
  cn,
  validityForm
}
