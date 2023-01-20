import type { Option } from '@/types/option.type'

export interface ProductEntity {
    id: number
    nanoid: string
    name: string
    description: string
    category: Option
    price: {
        initial: string
        discounted: string | null // null means no discount
    }
    colour: Option
    colours: Option<{ hex: string }>[]
    sizes: Option[]
    images: {
        id: number
        url: string
        order: number
    }[]
}

export interface AdminProductEntity extends ProductEntity {
    createdAt: string
    discountPercent: number
}
