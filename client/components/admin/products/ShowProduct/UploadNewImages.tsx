import { uploadImagesAction } from '@/lib/api/admin/product-images'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { StoreProductDto } from '@/types/api/dto/products/store-product.dto'
import { AdminProductEntity } from '@/types/entities/product.entity'
import { Button, Card, Stack, Title } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { SectionLayout } from '../../SectionLayout'
import { ImageDropzone } from './upload-new-images/ImageDropzone'

export const UploadNewImages = (product: AdminProductEntity) => {
    const queryClient = useQueryClient()

    const form = useForm<Pick<StoreProductDto, 'images'>>({
        initialValues: {
            images: [],
        },
    })

    const { mutateAsync: uploadImages, isLoading: isFormSubmitting } =
        useMutation(uploadImagesAction)

    const onSubmit = (dto: Pick<StoreProductDto, 'images'>) => {
        uploadImages({ productID: product.id, dto }).then(() => {
            form.reset()

            queryClient.invalidateQueries({
                queryKey: [REACT_QUERY_PRODUCTS_KEY, { id: product.id }],
            })
        })
    }

    const onDrop = (files: FileWithPath[]) =>
        form.setFieldValue('images', files)

    const removeImagePreview = (index: number) => {
        form.setFieldValue(
            'images',
            form.values.images.filter((_image, i) => i !== index),
        )
    }

    return (
        <SectionLayout title="Upload images">
            <form onSubmit={form.onSubmit(onSubmit)}>
                <ImageDropzone
                    onDrop={onDrop}
                    removeImagePreview={removeImagePreview}
                    images={form.values.images}
                    errors={form.errors.images}
                />

                <Button
                    mt="lg"
                    type="submit"
                    disabled={!form.values.images.length}
                    loading={isFormSubmitting}
                >
                    Save
                </Button>
            </form>
        </SectionLayout>
    )
}
