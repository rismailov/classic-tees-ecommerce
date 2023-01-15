import axios from '@/lib/axios'
import { StoreProductDto } from '@/types/api/dto/products/store-product.dto'
import { TJsonResponse } from '@/types/api/json-response.type'

export const deleteImageAction = async ({
    productID,
    imageID,
}: {
    productID: number
    imageID: number
}) =>
    await axios.delete<any, TJsonResponse>(
        `/admin/products/${productID}/images/${imageID}`,
    )

export const reorderImagesAction = async ({
    productID,
    images,
}: {
    productID: number
    images: { id: number; order: number }[]
}) =>
    await axios.patch<any, TJsonResponse>(
        `/admin/products/${productID}/images`,
        { images },
    )

export const uploadImagesAction = async ({
    productID,
    dto,
}: {
    productID: number
    dto: Pick<StoreProductDto, 'images'>
}) =>
    await axios.post<any, TJsonResponse>(
        `/admin/products/${productID}/images`,
        dto,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
