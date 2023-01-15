import {
    getPropertyOptions,
    updateProductAction,
} from '@/lib/api/admin/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { UpdateProductDto } from '@/types/api/dto/products/update-product.dto'
import { ProductEntity } from '@/types/entities/product.entity'
import {
    Stack,
    Text,
    Loader,
    Button,
    useMantineColorScheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { SectionLayout } from '../../SectionLayout'
import { ProductFormCommon } from '../ProductFormCommon'

export const EditProductData = (product: ProductEntity) => {
    const { colorScheme } = useMantineColorScheme()
    const queryClient = useQueryClient()
    const { data: options, isLoading: isOptionsLoading } = useQuery(
        'property-options',
        getPropertyOptions,
        {
            refetchOnWindowFocus: false,
        },
    )

    const form = useForm<UpdateProductDto>({
        initialValues: {
            name: product.name,
            category: product.category.value,
            colour: product.colour.value,
            sizes: product.sizes.map((s) => s.id),
            price: +product.price,
            isDiscounted: false,
            discountPercent: 5,
        },
    })

    const { mutateAsync, isLoading: isSubmitting } = useMutation(
        updateProductAction,
        { meta: { form } },
    )

    const onSubmit = (dto: UpdateProductDto) => {
        mutateAsync({ productID: product.id, dto }).then(() => {
            queryClient.invalidateQueries({
                queryKey: [REACT_QUERY_PRODUCTS_KEY, { id: product.id }],
            })
        })
    }

    return (
        <SectionLayout title="Update product">
            {isOptionsLoading && <Loader />}

            {!isOptionsLoading && !options && (
                <Text>Something went wrong fetching options...</Text>
            )}

            {!isOptionsLoading && options && (
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        <ProductFormCommon form={form} />

                        <Button
                            type="submit"
                            fullWidth
                            sx={{ height: 45 }}
                            loading={isSubmitting}
                            variant={
                                colorScheme === 'dark' ? 'light' : 'filled'
                            }
                        >
                            Update
                        </Button>
                    </Stack>
                </form>
            )}
        </SectionLayout>
    )
}
