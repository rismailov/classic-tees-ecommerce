import { StoreReviewDto } from '@/types/api/dto/reviews/store-review.dto'
import axios from '@/lib/axios'

export const storeReview = async ({
    productID,
    reviewData,
}: {
    productID: number
    reviewData: StoreReviewDto
}) => await axios.post(`/products/${productID}/reviews`, reviewData)
