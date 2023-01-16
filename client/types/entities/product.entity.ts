export interface ProductEntity {
    id: number
    nanoid: string
    name: string
    category: {
        value: string
        label: string
    }
    price: {
        initial: string
        // if discounted price is null, then there's no discount
        // i chose this approach because separate "isDiscounted" field is
        // kinda redundant. For now its only usage is to check if product is discounted
        discounted: string | null
    }
    colour: { value: string; label: string }
    colours: { value: string; label: string; hex: string }[]
    sizes: { id: string; name: string }[]
    createdAt: string
    images: { id: number; url: string; order: number }[]
}
