import { Option } from '@/types/option.type'

// react-query
export const REACT_QUERY_AUTH_KEY = 'auth-user'
export const REACT_QUERY_COLOURS_KEY = 'colours'
export const REACT_QUERY_PRODUCTS_KEY = 'products'

// Products
export const CATEGORIES: Option[] = [
    { value: 'polo', label: 'Polo' },
    { value: 'v-neck', label: 'V-Neck' },
    { value: 'tall', label: 'Tall' },
    { value: 'activewear', label: 'Activewear' },
]

// Size labels (international)
export const SIZE_LABELS: Record<string, string> = {
    s: 'Small',
    m: 'Medium',
    l: 'Large',
    xl: 'Extra Large',
    ['2xl']: '2XL',
    ['3xl']: '3XL',
}

// Amount of products loaded on "Load more" button click
export const LOAD_MORE_PRODUCTS_AMOUNT = 6
