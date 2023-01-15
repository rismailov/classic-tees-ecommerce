import {
    deleteProductImage,
    setProductImageAsMain,
    uploadImagesAction,
} from '@/lib/api/admin/product-images'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { StoreProductDto } from '@/types/api/dto/products/store-product.dto'
import { ProductEntity } from '@/types/entities/product.entity'
import { Grid, Stack, Card, Title, Divider, Button } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from 'react-query'
import { ImageDropzone } from '../ShowProduct/upload-new-images/ImageDropzone'
import { CurrentImage } from '../ShowProduct/edit-product-images/CurrentImage'

export const ProductImages = ({
    productID,
    currentImages,
}: {
    productID: string
    currentImages: ProductEntity['images']
}) => {
    const queryClient = useQueryClient()

    // Upload new images for the product

    return (
        <Stack w="100%" sx={{ flex: 1 }} spacing="xs">
            <Title order={4}>Images</Title>

            <Card shadow="xl">
                <Stack>
                    <Grid columns={12}>
                        {currentImages.map((image) => (
                            <Grid.Col key={image.id} span={4}>
                                <CurrentImage
                                    canDelete={currentImages.length > 1}
                                    currentImage={image}
                                    deleteImage={deleteImage}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Stack>

                <Divider my="md" />
            </Card>
        </Stack>
    )
}
