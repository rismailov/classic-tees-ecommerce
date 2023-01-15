import { PriceProductFilter } from '@/types/product-filters/price.product-filter'
import { Sort } from '@/types/product-filters/sort.product-filter'

export type GetProductsDto = {
    categories?: string[]
    sizes?: string[]
    colours?: string[]
    price?: PriceProductFilter
    sortBy?: Sort | null
}
