import { ProductEntity } from '@/types/entities/product.entity'
import { Grid, Stack } from '@mantine/core'
import React from 'react'
import { EditProductData } from './EditProductData'
import { EditProductImages } from './EditProductImages'
import { UploadNewImages } from './UploadNewImages'

export const ShowProduct = (product: ProductEntity) => {
    return (
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
    )
}
