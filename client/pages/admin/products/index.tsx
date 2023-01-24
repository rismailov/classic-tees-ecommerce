import { ProductsTable } from '@/components/admin/products/ProductsTable'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { getProducts } from '@/lib/api/admin/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { Button, Card, Container, Loader, Text } from '@mantine/core'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

export default function ProductsIndex() {
    const { data: products, isLoading } = useQuery({
        queryKey: [REACT_QUERY_PRODUCTS_KEY],
        queryFn: getProducts,
        refetchOnWindowFocus: false,
    })

    return (
        <Container>
            <PageLayout
                breadcrumbs={['Products']}
                rightSide={
                    <Button
                        component={Link}
                        href="/admin/products/create"
                        color="dark"
                    >
                        Create
                    </Button>
                }
            >
                <Card withBorder>
                    {isLoading && <Loader />}

                    {products && !products.length && (
                        <Text>No records found...</Text>
                    )}

                    {products && !!products.length && (
                        <ProductsTable products={products} />
                    )}
                </Card>
            </PageLayout>
        </Container>
    )
}
