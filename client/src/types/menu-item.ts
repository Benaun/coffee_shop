export type Category = "горячие напитки" | "холодные напитки" | "еда"

export type CustomOptions = {
  name: string
  options: string[]
}

export interface IMenuItem {
  id: string
  name: string
  descrption: string
  price: number
  image: string
  catergories: Category[]
}
