import { ProductEntity } from '@/types/entities/product.entity'
import { Group, Stack, Title } from '@mantine/core'
import { Reviews } from '../Reviews'
import { AddProductToCartForm } from './AddProductToCartForm'

export const ProductDescription = ({ product }: { product: ProductEntity }) => {
    return (
        <Stack w="100%" spacing="xl" sx={{ flex: 1 }}>
            <Stack spacing="xs">
                {/* name */}
                <Title order={2}>{product.name}</Title>

                {/* rating */}
                <Reviews />

                {/* price */}
                <Title order={2} weight={500}>
                    {product.price} USD
                </Title>
            </Stack>

            <AddProductToCartForm product={product} />
        </Stack>
    )
}
