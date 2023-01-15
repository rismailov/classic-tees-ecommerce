import { ProductEntity } from '@/types/entities/product.entity'
import { Stack, Title, Text, UnstyledButton, Box } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { Reviews } from '../../Reviews'
import { QuickAdd } from './QuickAdd'
import { useStyles } from './ProductCard.styles'

export const ProductCard = ({ product }: { product: ProductEntity }) => {
    // This is needed to delay animation. Can be safely removed.
    // @note: to understand the purpose of this delay, add product to Cart from "Quick add" button,
    // and then quickly remove the mouse from the product card
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const { classes } = useStyles({ isAddingToCart })

    return (
        <UnstyledButton
            component={Link}
            href={`/shop/${product.nanoid}`}
            className={classes.cardAnchor}
        >
            {/* Image */}
            <Box className={classes.imageWrapper}>
                <Image
                    src={product.images[0].url}
                    fill
                    alt={product.name}
                    priority
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw
                    "
                />

                <QuickAdd
                    product={product}
                    isLoading={isAddingToCart}
                    setIsLoading={setIsAddingToCart}
                />
            </Box>

            {/* Description */}
            <Stack spacing={5} p="md">
                <Reviews />

                <Title order={5}>{product.name}</Title>

                <Text>${product.price} USD</Text>
            </Stack>
        </UnstyledButton>
    )
}
