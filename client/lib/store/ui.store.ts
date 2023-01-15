import create from 'zustand'

type UiStore = {
    isCartOpened: boolean
    toggleCart: () => void
}

const useUiStore = create<UiStore>((set) => ({
    isCartOpened: false,
    toggleCart: () => set((state) => ({ isCartOpened: !state.isCartOpened })),
}))

export default useUiStore
