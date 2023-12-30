export function groupBy(array: any, key: string) {
  const keys = key.includes('.') ? key.split('.') : key

  if (Array.isArray(array)) {
    return array.reduce(
      (acc: { [key: string | number]: any }, item: { [key: string]: any }) => {
        let keyCurrent: any

        if (Array.isArray(keys)) {
          keyCurrent = item
          keys.forEach((key) => {
            if (keyCurrent[item[key]]) keyCurrent = keyCurrent[key]
            else throw new Error(`A propriedade ${key} não foi encontrada!`)
          })
        } else {
          if (item[key]) keyCurrent = item[key]
          else throw new Error(`A propriedade ${key} não foi encontrada!`)
        }
        if (!acc[keyCurrent]) acc[keyCurrent] = []
        acc[keyCurrent].push(item)

        return acc
      },
      {}
    )
  } else {
    throw new Error('O parâmetro "array" deve ser um array.')
  }
}

export function indexingBy(array: any[], key: string) {
  const keys = key.includes('.') ? key.split('.') : key

  if (Array.isArray(array)) {
    return array.reduce(
      (acc: { [key: string | number]: any }, item: { [key: string]: any }) => {
        let keyCurrent: any

        if (Array.isArray(keys)) {
          keyCurrent = item
          keys.forEach((key) => {
            if (keyCurrent[key]) keyCurrent = keyCurrent[key]
            else throw new Error(`A propriedade ${key} não foi encontrada!`)
          })
        } else {
          if (item[key]) keyCurrent = item[key]
          else throw new Error(`A propriedade ${key} não foi encontrada!`)
        }
        acc[keyCurrent] = item

        return acc
      },
      {}
    )
  } else {
    throw new Error('O parâmetro "array" deve ser um array.')
  }
}
