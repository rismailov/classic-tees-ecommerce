import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { getProducts } from '@/lib/api/admin/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import {
    Badge,
    Button,
    Card,
    Group,
    Loader,
    Table,
    Text,
    useMantineColorScheme,
} from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function ProductsIndex() {
    const router = useRouter()
    const { data: products, isLoading } = useQuery(
        REACT_QUERY_PRODUCTS_KEY,
        getProducts,
        { refetchOnWindowFocus: false },
    )

    const { colorScheme } = useMantineColorScheme()

    return (
        <PageLayout
            breadcrumbs={['Products']}
            rightSide={
                <Button
                    component={Link}
                    href="/admin/products/create"
                    variant={colorScheme === 'dark' ? 'light' : 'filled'}
                >
                    Create
                </Button>
            }
        >
            <Card>
                {isLoading && <Loader />}

                {products && !products.length && (
                    <Text>No records found...</Text>
                )}

                {products && !!products.length && (
                    <Table highlightOnHover striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Created</th>
                                <th>Sizes</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    role="button"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        router.push(
                                            `/admin/products/${product.id}`,
                                        )
                                    }
                                >
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category.label}</td>
                                    <td>{product.price}</td>
                                    <td>{product.createdAt}</td>
                                    <td>
                                        <Group spacing={5}>
                                            {product.sizes.map(
                                                ({ id, name }) => (
                                                    <Badge key={id} size="xs">
                                                        {name}
                                                    </Badge>
                                                ),
                                            )}
                                        </Group>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card>
        </PageLayout>
    )
}
