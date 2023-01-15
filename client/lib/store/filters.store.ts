import { PriceProductFilter } from '@/types/product-filters/price.product-filter'
import { Sort } from '@/types/product-filters/sort.product-filter'
import create from 'zustand'
import { LOAD_MORE_PRODUCTS_AMOUNT } from '../constants'

type FiltersStore = {
    categories: string[]
    setCategories: (categories: string[]) => void

    sizes: string[]
    setSizes: (sizes: string[]) => void

    colours: string[]
    setColours: (colours: string[]) => void

    price: PriceProductFilter
    setPrice: (price: PriceProductFilter) => void

    sort: Sort
    setSort: (v: Sort) => void

    limit: number
    setLimit: (v: number) => void
}

const useFiltersStore = create<FiltersStore>((set) => ({
    categories: ['polo'],
    setCategories: (categories) => set({ categories }),

    sizes: [],
    setSizes: (sizes) => set({ sizes }),

    colours: [],
    setColours: (colours) => set({ colours }),

    price: { min: null, max: null, onSale: false },
    setPrice: (price) => set({ price }),

    sort: 'date-desc',
    setSort: (value) => set({ sort: value }),

    limit: LOAD_MORE_PRODUCTS_AMOUNT,
    setLimit: (limit) => set({ limit }),
}))

export default useFiltersStore
