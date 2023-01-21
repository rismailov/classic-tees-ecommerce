import axios from '@/lib/axios'
import { GetProductsDto } from '@/types/api/dto/products/get-products.dto'
import {
    ProductEntity,
    UserProductEntity,
} from '@/types/entities/product.entity'
import { FilterOptions } from '../store/filter-options.store'

// Get products
type ProductsResponse = {
    data: ProductEntity[]
    // there's more to it, but it's not relevant
    // we only care about total (amount of products)
    meta: { total: number }
}
export const getProducts = async (params?: GetProductsDto) =>
    await axios.get<any, ProductsResponse>('products', { params })

export const getFilterOptions = async () =>
    await axios.get<any, FilterOptions>('options/product-filters')

export const showProduct = async (nanoid: string) =>
    await axios.get<any, UserProductEntity>(`products/${nanoid}`)
