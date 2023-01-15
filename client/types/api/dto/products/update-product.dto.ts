import { StoreProductDto } from './store-product.dto'

export type UpdateProductDto = Omit<StoreProductDto, 'images'>
