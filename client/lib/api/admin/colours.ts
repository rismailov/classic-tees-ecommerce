import axios from '@/lib/axios'
import { StoreColourDto } from '@/types/api/dto/colours/store-colour.dto'
import { TJsonResponse } from '@/types/api/json-response.type'
import { TPaginatedData } from '@/types/api/paginated-data.type'
import { ColourEntity } from '@/types/entities/colour.entity'

export const getColours = (params: {
    page: number
}): Promise<TPaginatedData<ColourEntity[]>> =>
    axios.get('/admin/colours', { params })

export const storeColour = (data: StoreColourDto): Promise<TJsonResponse> =>
    axios.post('/admin/colours', data)

export const removeColour = (id: number): Promise<TJsonResponse> =>
    axios.delete(`/admin/colours/${id}`)
