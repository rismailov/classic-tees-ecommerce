import useRaisedShadow from '@/hooks/framer-motion/use-raised-shadow'
import {
    deleteImageAction,
    reorderImagesAction,
} from '@/lib/api/admin/product-images'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { ProductEntity } from '@/types/entities/product.entity'
import { Stack, Text, Alert, Group, Button } from '@mantine/core'
import { Reorder, useMotionValue } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { BsLightbulb } from 'react-icons/bs'
import { useMutation, useQueryClient } from 'react-query'
import { SectionLayout } from '../../SectionLayout'
import { CurrentImage } from './edit-product-images/CurrentImage'

export const EditProductImages = (product: ProductEntity) => {
    const queryClient = useQueryClient()

    // Framer motion
    const y = useMotionValue(0)
    const boxShadow = useRaisedShadow(y)

    // Order images
    const [images, setImages] = useState(product.images)
    const [isOrderChanged, setOrderChanged] = useState(false)
    const { mutateAsync: mutateReorder } = useMutation(reorderImagesAction)

    useEffect(() => {
        if (product.images.length !== images.length) {
            setImages(product.images)
        }
    }, [product])

    useEffect(() => {
        setOrderChanged(!images.every((img, idx) => img.order === idx))
    }, [images])

    const reorderImages = () => {
        if (!isOrderChanged) {
            return
        }

        mutateReorder({
            productID: product.id,
            images: images.map(({ id }, idx) => ({ id, order: idx })),
        })
    }

    // Delete image
    const { mutateAsync: mutateDelete } = useMutation(deleteImageAction)
    const deleteImage = (imageID: number) => {
        if (
            confirm(
                "Are you sure to delete this image? This action can't be undone",
            )
        ) {
            mutateDelete({ productID: product.id, imageID }).then(() => {
                queryClient.invalidateQueries({
                    queryKey: [REACT_QUERY_PRODUCTS_KEY, { id: product.id }],
                })
            })
        }
    }

    return (
        <SectionLayout title="Reorder / Delete images">
            <Alert mb="md">
                <Group
                    sx={(theme) => ({
                        color: theme.fn.primaryColor(),
                    })}
                >
                    <BsLightbulb size={17} />

                    <Text weight={500}>
                        The first image will be the main one.
                    </Text>
                </Group>
            </Alert>

            <Reorder.Group
                axis="y"
                values={images}
                onReorder={setImages}
                style={{
                    position: 'relative',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }}
            >
                <Stack spacing="sm" sx={{ maxWidth: 150 }}>
                    {images.map((image) => (
                        <Reorder.Item
                            key={image.id}
                            id={image.id.toString()}
                            value={image}
                            style={{
                                boxShadow,
                                cursor: 'grab',
                                width: '100%',
                            }}
                        >
                            <CurrentImage
                                currentImage={image}
                                canDelete={images.length > 1}
                                deleteImage={deleteImage}
                            />
                        </Reorder.Item>
                    ))}
                </Stack>
            </Reorder.Group>

            <Button mt="lg" onClick={reorderImages} disabled={!isOrderChanged}>
                Reorder images
            </Button>
        </SectionLayout>
    )
}
