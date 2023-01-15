import { ImageDropzone } from '@/components/admin/products/ShowProduct/upload-new-images/ImageDropzone'
import { ProductFormCommon } from '@/components/admin/products/ProductFormCommon'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { storeProduct } from '@/lib/api/admin/products'
import { StoreProductDto } from '@/types/api/dto/products/store-product.dto'
import { Button, Card, Stack, useMantineColorScheme } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import { useForm } from '@mantine/form'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export default function CreateProduct() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const form = useForm<StoreProductDto>({
        initialValues: {
            name: '',
            category: 'v-neck',
            colour: '1',
            sizes: [],
            price: 0.0,
            images: [],
            isDiscounted: false,
            discountPercent: 5,
        },
    })

    const { mutateAsync, isLoading: isFormSubmitting } = useMutation(
        storeProduct,
        {
            meta: { form },
            onSuccess: ({ product }) => {
                queryClient.setQueryData(
                    ['products', { id: product.id }],
                    product,
                )

                router.push(`/admin/products/${product.id}`)
            },
        },
    )

    const { colorScheme } = useMantineColorScheme()

    const onDrop = (files: FileWithPath[]) => {
        form.setValues({
            ...form.values,
            images: files,
        })
    }

    const removeImagePreview = (index: number) => {
        form.setFieldValue(
            'images',
            form.values.images.filter((_image, i) => i !== index),
        )
    }

    return (
        <Card p="xl" maw={500}>
            <form onSubmit={form.onSubmit((data) => mutateAsync(data))}>
                <Stack>
                    <ProductFormCommon form={form} />

                    <ImageDropzone
                        onDrop={onDrop}
                        removeImagePreview={removeImagePreview}
                        images={form.values.images}
                        errors={form.errors.images}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        h={45}
                        loading={isFormSubmitting}
                        variant={colorScheme === 'dark' ? 'light' : 'filled'}
                    >
                        Save
                    </Button>
                </Stack>
            </form>
        </Card>
    )
}

CreateProduct.getLayout = (page: ReactElement) => (
    <PageLayout
        breadcrumbs={[{ label: 'Products', href: '/admin/products' }, 'Create']}
    >
        {page}
    </PageLayout>
)
