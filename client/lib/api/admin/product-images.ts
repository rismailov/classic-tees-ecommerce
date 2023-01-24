import axios from '@/lib/axios'
import { StoreProductDto } from '@/types/api/dto/products/store-product.dto'
import { TJsonResponse } from '@/types/api/json-response.type'

export const deleteImageAction = ({
    productID,
    imageID,
}: {
    productID: number
    imageID: number
}) =>
    axios.delete<any, TJsonResponse>(
        `/admin/products/${productID}/images/${imageID}`,
    )

export const reorderImagesAction = ({
    productID,
    images,
}: {
    productID: number
    images: { id: number; order: number }[]
}) =>
    axios.patch<any, TJsonResponse>(`/admin/products/${productID}/images`, {
        images,
    })

export const uploadImagesAction = ({
    productID,
    dto,
}: {
    productID: number
    dto: Pick<StoreProductDto, 'images'>
}) =>
    axios.post<any, TJsonResponse>(`/admin/products/${productID}/images`, dto, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
