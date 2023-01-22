import { UserProductShowEntity } from '@/types/entities/product.entity'
import { Text, Stack, Title, Button, Pagination } from '@mantine/core'
import { Review } from './customer-reviews/Review'

export const CustomerReviews = ({
    showReviewModal,
    reviews,
    setCurrentPage,
}: {
    showReviewModal: () => void
    reviews: UserProductShowEntity['reviews']
    setCurrentPage: (page: number) => void
}) => {
    return (
        <Stack align="center" spacing="xl" pb={80}>
            <Stack spacing={5} align="center" justify="center" mb="sm">
                <Title order={2}>Customer Reviews</Title>

                <Button
                    onClick={showReviewModal}
                    mt="sm"
                    size="md"
                    color="dark"
                    radius="xl"
                >
                    Write a review
                </Button>
            </Stack>

            <Stack>
                {reviews.meta.total ? (
                    <>
                        {reviews.data.map((review) => (
                            <Review key={review.id} {...review} />
                        ))}

                        <Pagination
                            mt="md"
                            sx={{ alignSelf: 'center' }}
                            color="dark"
                            page={reviews.meta.current_page}
                            onChange={setCurrentPage}
                            total={reviews.meta.last_page}
                        />
                    </>
                ) : (
                    <Text size="lg" color="dimmed">
                        No reviews for this product yet. Be the first one to
                        write it!
                    </Text>
                )}
            </Stack>
        </Stack>
    )
}
