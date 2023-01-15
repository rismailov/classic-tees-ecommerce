import axios from '@/lib/axios'
import { StoreColourDto } from '@/types/api/dto/colours/store-colour.dto'
import { TJsonResponse } from '@/types/api/json-response.type'

export const getColours = async (): Promise<{ id: number; value: string }[]> =>
    await axios.get('colours')

export const storeColour = async (
    data: StoreColourDto,
): Promise<TJsonResponse> =>
    await axios.post('colours', {
        colours: data.colours.map((colour) => colour.value),
    })

export const removeColour = async (id: number): Promise<TJsonResponse> =>
    await axios.delete(`colours/${id}`)
