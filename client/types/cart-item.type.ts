export type CartItem = {
    id: string // looks like: `${product.id}-${product.size.id}`
    imageUrl: string
    name: string
    size: { id: string; name: string }
    colour: { id: string; name: string }
    price: string
    amount: number
}
