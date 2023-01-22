import { CustomerReviews } from '@/components/shop/show-product/CustomerReviews'
import { WriteReviewModal } from '@/components/shop/show-product/modals/WriteReviewModal'
import { ProductDescription } from '@/components/shop/show-product/ProductDescription'
import { ProductImages } from '@/components/shop/show-product/ProductImages'
import { showProduct } from '@/lib/api/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { Container, Divider, Group, Stack } from '@mantine/core'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from 'react-query'

export default function ShowProduct() {
    const router = useRouter()
    const { nanoid } = router.query as { nanoid: string }

    const [currentPage, setCurrentPage] = useState(1)

    const [isReviewModalOpened, setReviewModalOpened] = useState(false)

    const { data: product, isLoading } = useQuery(
        [REACT_QUERY_PRODUCTS_KEY, { nanoid, page: currentPage }],
        () => showProduct({ productNanoid: nanoid, reviewsPage: currentPage }),
        {
            retry: false,
            keepPreviousData: true,
        },
    )

    if (isLoading) {
        return <></>
    }

    if (!product) {
        return <>product not found</>
    }

    return (
        <>
            <WriteReviewModal
                productID={product.id}
                productNanoid={product.nanoid}
                opened={isReviewModalOpened}
                onClose={() => setReviewModalOpened(false)}
            />

            <Container pt="xl">
                <Stack spacing={50}>
                    <Group noWrap align="start" spacing={50}>
                        <ProductImages product={product} />

                        <ProductDescription product={product} />
                    </Group>

                    <Divider />

                    <CustomerReviews
                        showReviewModal={() => setReviewModalOpened(true)}
                        reviews={product.reviews}
                        setCurrentPage={setCurrentPage}
                    />
                </Stack>
            </Container>
        </>
    )
}
