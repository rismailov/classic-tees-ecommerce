import { StoreReviewDto } from '@/types/api/dto/reviews/store-review.dto'
import axios from '@/lib/axios'

export const storeReview = ({
    productID,
    reviewData,
}: {
    productID: number
    reviewData: StoreReviewDto
}) => axios.post(`/products/${productID}/reviews`, reviewData)
