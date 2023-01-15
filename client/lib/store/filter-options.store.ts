import { Option } from '@/types/option.type'
import create from 'zustand'

export type FilterOptions = {
    sizes: Option[]
    colours: Option<{ hex: string }>[]
}

type FilterOptionsStore = {
    options: FilterOptions
    setOptions: (options: FilterOptions) => void
}

const useFilterOptionsStore = create<FilterOptionsStore>((set) => ({
    options: {
        sizes: [],
        colours: [],
    },
    setOptions: (options) => set({ options }),
}))

export default useFilterOptionsStore
