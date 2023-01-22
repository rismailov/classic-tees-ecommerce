import axios from '@/lib/axios'
import { StoreColourDto } from '@/types/api/dto/colours/store-colour.dto'
import { TJsonResponse } from '@/types/api/json-response.type'
import { TPaginatedData } from '@/types/api/paginated-data.type'
import { ColourEntity } from '@/types/entities/colour.entity'

export const getColours = async (params: {
    page: number
}): Promise<TPaginatedData<ColourEntity[]>> =>
    await axios.get('/admin/colours', { params })

export const storeColour = async (
    data: StoreColourDto,
): Promise<TJsonResponse> => await axios.post('/admin/colours', data)

export const removeColour = async (id: number): Promise<TJsonResponse> =>
    await axios.delete(`/admin/colours/${id}`)
