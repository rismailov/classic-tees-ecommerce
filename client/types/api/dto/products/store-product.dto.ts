import { FileWithPath } from '@mantine/dropzone'

export type StoreProductDto = {
    name: string
    category: string
    colour: string
    sizes: (string | number)[]
    price: number
    images: FileWithPath[]
    isDiscounted: boolean
    discountPercent: number
}
