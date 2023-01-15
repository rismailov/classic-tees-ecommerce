import axios from '@/lib/axios'
import { StoreProductDto } from '@/types/api/dto/products/store-product.dto'
import { UpdateProductDto } from '@/types/api/dto/products/update-product.dto'
import { TJsonResponse } from '@/types/api/json-response.type'
import { ProductEntity } from '@/types/entities/product.entity'

export const getProducts = async () =>
    await axios.get<any, ProductEntity[]>('/admin/products')

// Get available product properties
type TOptions = {
    sizes: { id: number; value: string }[]
    categories: string[]
    colours: { value: string; label: string; hex: string }[]
}
export const getPropertyOptions = async () => {
    const { sizes, colours, categories } = await axios.get<any, TOptions>(
        '/admin/products/property-options',
    )

    // convert int ids to string for mantine form to work correctly
    // can't find it in docs, but essentially mantine checkboxes/selects don't work
    // when using integer in "value" (as opposed to using string)
    return {
        sizes: Object.values(sizes).map((s) => ({
            id: s.id.toString(),
            value: s.value.toUpperCase(),
        })),
        colours,
        categories,
    }
}

export const storeProduct = async (dto: StoreProductDto) =>
    await axios.post<any, TJsonResponse & { product: ProductEntity }>(
        '/admin/products',
        dto,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )

export const updateProductAction = async ({
    productID,
    dto,
}: {
    productID: number
    dto: UpdateProductDto
}) => {
    return await axios.patch<any, TJsonResponse>(
        `/admin/products/${productID}`,
        dto,
    )
}

export const showProduct = async (id: string) =>
    await axios.get<any, ProductEntity>(`/admin/products/${id}`)
