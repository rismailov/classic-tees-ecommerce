import axios from '@/lib/axios'
import { GetProductsDto } from '@/types/api/dto/products/get-products.dto'
import {
    UserProductIndexEntity,
    UserProductShowEntity,
} from '@/types/entities/product.entity'
import { FilterOptions } from '../store/filter-options.store'

// Get products
type ProductsResponse = {
    data: UserProductIndexEntity[]
    // there's more to it, but it's not relevant
    // we only care about total (amount of products)
    meta: { total: number }
}
export const getProducts = async (params?: GetProductsDto) =>
    await axios.get<any, ProductsResponse>('products', { params })

export const getFilterOptions = async () =>
    await axios.get<any, FilterOptions>('options/product-filters')

export const showProduct = async ({
    productNanoid,
    reviewsPage,
}: {
    productNanoid: string
    reviewsPage: number
}) =>
    await axios.get<any, UserProductShowEntity>(`products/${productNanoid}`, {
        params: {
            page: reviewsPage,
        },
    })
