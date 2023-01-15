import { ProductActionsMenu } from '@/components/admin/products/show/ProductActionsMenu'
import { ShowProduct } from '@/components/admin/products/ShowProduct'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { showProduct } from '@/lib/api/admin/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { Text } from '@mantine/core'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function Show() {
    const router = useRouter()
    const { id: productID } = router.query as { id: string }

    const { data: product, isLoading: isProductLoading } = useQuery(
        [REACT_QUERY_PRODUCTS_KEY, { id: +productID }],
        () => showProduct(productID),
        {
            refetchOnWindowFocus: false,
        },
    )

    if (isProductLoading) {
        return <Text>Loading product...</Text>
    }

    if (!product) {
        return <Text>Product not found...</Text>
    }

    return (
        <PageLayout
            breadcrumbs={[
                { label: 'Products', href: '/admin/products' },
                product.name,
            ]}
            rightSide={<ProductActionsMenu nanoid={product.nanoid} />}
        >
            <ShowProduct {...product} />
        </PageLayout>
    )
}
