import { url } from 'inspector'

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

export {
  updateHtmlClass,
  buildAccessArchives,
  extractNameArchive,
  destroyDomainInPath
}
