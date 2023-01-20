import { AdminProductEntity } from '@/types/entities/product.entity'
import { Badge, Group, Table, Text } from '@mantine/core'
import { useRouter } from 'next/navigation'

export const ProductsTable = ({
    products,
}: {
    products: AdminProductEntity[]
}) => {
    const router = useRouter()

    return (
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
                            router.push(`/admin/products/${product.id}`)
                        }
                    >
                        <td>{product.id}</td>
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
                ))}
            </tbody>
        </Table>
    )
}
