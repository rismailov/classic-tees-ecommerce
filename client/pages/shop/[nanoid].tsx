import { ProductDescription } from '@/components/shop/show-product/ProductDescription'
import { ProductImages } from '@/components/shop/show-product/ProductImages'
import { showProduct } from '@/lib/api/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { Container, Group } from '@mantine/core'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function ShowProduct() {
    const router = useRouter()
    const { nanoid } = router.query as { nanoid: string }

    const { data: product, isLoading } = useQuery(
        [REACT_QUERY_PRODUCTS_KEY, { nanoid }],
        () => showProduct(nanoid),
        {
            retry: false,
        },
    )

    if (isLoading) {
        return <></>
    }

    if (!product) {
        return <>product not found</>
    }

    return (
        <Container pt="xl">
            <Group noWrap align="start" spacing={50}>
                <ProductImages product={product} />

                <ProductDescription product={product} />
            </Group>
        </Container>
    )
}
