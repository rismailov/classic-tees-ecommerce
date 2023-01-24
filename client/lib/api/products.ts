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
export const getProducts = (params?: GetProductsDto) =>
    axios.get<any, ProductsResponse>('products', { params })

export const getFilterOptions = () =>
    axios.get<any, FilterOptions>('options/product-filters')

export const showProduct = ({
    productNanoid,
    reviewsPage,
}: {
    productNanoid: string
    reviewsPage: number
}) =>
    axios.get<any, UserProductShowEntity>(`products/${productNanoid}`, {
        params: {
            page: reviewsPage,
        },
    })
