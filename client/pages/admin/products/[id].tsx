import { EditProductData } from '@/components/admin/products/show/EditProductData'
import { EditProductImages } from '@/components/admin/products/show/EditProductImages/EditProductImages'
import { ProductActionsMenu } from '@/components/admin/products/show/ProductActionsMenu'
import { UploadNewImages } from '@/components/admin/products/show/UploadNewImages'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { showProduct } from '@/lib/api/admin/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { Container, Grid, Stack, Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

export default function Show() {
    const router = useRouter()
    const { id: productID } = router.query as { id: string }
    const { data: product, isLoading: isProductLoading } = useQuery({
        queryKey: [REACT_QUERY_PRODUCTS_KEY, { id: +productID }],
        queryFn: () => showProduct(productID),
        // productID is undefined at first render
        enabled: typeof productID === 'string',
        refetchOnWindowFocus: false,
    })

    return (
        <Container>
            <PageLayout
                breadcrumbs={[
                    { label: 'Products', href: '/admin/products' },
                    product ? product.name : 'Loading...',
                ]}
                rightSide={
                    <ProductActionsMenu
                        nanoid={product ? product.nanoid : ''}
                    />
                }
            >
                {isProductLoading && <Text>Loading product...</Text>}

                {!isProductLoading && !product && (
                    <Text>Product not found</Text>
                )}

                {!isProductLoading && product && (
                    <Grid gutter="xl">
                        <Grid.Col span={5}>
                            <EditProductData {...product} />
                        </Grid.Col>

                        <Grid.Col span={7}>
                            <Stack spacing="xl">
                                <UploadNewImages {...product} />

                                <EditProductImages {...product} />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                )}
            </PageLayout>
        </Container>
    )
}
