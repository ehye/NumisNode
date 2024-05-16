import { Gender } from '../types/types'

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

export const isGender = (str: string): str is Gender =>
  Object.values(Gender)
    .map(v => v.toString())
    .includes(str)

export const randomString = (): string => {
  const length = 14
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
