import { CartItem } from '@/types/cart-item.type'
import create from 'zustand'

type CartStore = {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (itemID: string) => void
    updateItemAmount: (data: { itemID: string; amount: number }) => void
}

const useCartStore = create<CartStore>((set) => ({
    items: [
        {
            id: '380-131310901231k2jkw',
            imageUrl:
                'http://localhost:8000/storage/images/products/4/4002L_MILITARYBEIGE_3.webp',
            name: 'Test One',
            size: { id: '10', name: 'xl' },
            colour: { id: '1', name: 'Black' },
            price: '25.31',
            amount: 1,
        },
    ],

    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id)

            return {
                items: !existing
                    ? [...state.items, item]
                    : state.items.map((i) =>
                          i.id === item.id ? { ...i, amount: i.amount + 1 } : i,
                      ),
            }
        }),

    removeItem: (itemID) =>
        set((state) => ({
            items: state.items.filter((item) => item.id !== itemID),
        })),

    updateItemAmount: ({ itemID, amount }) =>
        set((state) => ({
            items: state.items.map((item) =>
                `${item.id}-${item.size.id}` === itemID
                    ? { ...item, amount }
                    : item,
            ),
        })),
}))

export default useCartStore
