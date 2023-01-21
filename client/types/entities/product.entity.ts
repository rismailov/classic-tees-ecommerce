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

// show product in app
export interface UserProductEntity extends ProductEntity {
    availableColours: {
        nanoid: string
        colour: {
            value: string
            label: string
            hex: string
        }
    }[]
}

// show product in admin dashboard
export interface AdminProductEntity extends ProductEntity {
    createdAt: string
    discountPercent: number
}
