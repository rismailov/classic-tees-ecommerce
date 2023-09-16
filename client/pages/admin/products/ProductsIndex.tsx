import { ProductsTable } from '@/components/admin/products/ProductsTable'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { getProducts } from '@/lib/api/admin/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { Button, Card, Container, Text } from '@mantine/core'
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
                    {/* {isLoading && <Loader />} */}

                    {!isLoading && products && !products.length && (
                        <Text>No records found...</Text>
                    )}

                    <Table highlightOnHover striped>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Created</th>
                                <th>Sizes</th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading &&
                                Array.from({ length: 5 }, () => 'foo')}

                            {/* {!isLoading &&
    products.map((product) => (
        <tr
            key={product.id}
            role="button"
            style={{ cursor: 'pointer' }}
            onClick={() =>
                router.push(`/admin/products/${product.id}`)
            }
        >
            <td>{product.name}</td>
            <td>{product.category.label}</td>
            <td>
                <Group spacing="xs" position="apart">
                    <Text
                        strikethrough={
                            product.price.discounted !== null
                        }
                    >
                        {product.price.initial}
                    </Text>

                    {product.price.discounted && (
                        <Text color="orange" weight={500}>
                            {product.price.discounted}
                        </Text>
                    )}
                </Group>
            </td>
            <td>{product.createdAt}</td>
            <td>
                <Group spacing={5}>
                    {product.sizes.map(({ value, label }) => (
                        <Badge key={value} size="xs">
                            {label}
                        </Badge>
                    ))}
                </Group>
            </td>
        </tr>
    ))} */}
                        </tbody>
                    </Table>

                    <ProductsTable
                        products={products ?? []}
                        isLoading={isLoading}
                    />
                </Card>
            </PageLayout>
        </Container>
    )
}
