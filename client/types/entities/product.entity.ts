export interface ProductEntity {
    id: number
    nanoid: string
    name: string
    category: {
        value: string
        label: string
    }
    price: string
    colour: { value: string; label: string }
    colours: { value: string; label: string; hex: string }[]
    sizes: { id: string; name: string }[]
    createdAt: string
    images: { id: number; url: string; order: number }[]
}
