import { Filters } from '@/components/shop/Filters'
import { Products } from '@/components/shop/Products'
import { SortProducts } from '@/components/shop/Products/products-header/SortProducts'
import { getFilterOptions } from '@/lib/api/products'
import { CATEGORIES } from '@/lib/constants'
import useFilterOptionsStore, {
    FilterOptions,
} from '@/lib/store/filter-options.store'
import useFiltersStore from '@/lib/store/filters.store'
import { Container, Text, Group, Stack, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
    return {
        props: await getFilterOptions(),
    }
}

export default function Shop({ sizes, colours }: FilterOptions) {
    const setCategories = useFiltersStore((state) => state.setCategories)
    const setOptions = useFilterOptionsStore((state) => state.setOptions)

    const [productsTotal, setProductsTotal] = useState(0)

    const router = useRouter()
    const { category } = router.query as { category?: string }

    useEffect(() => {
        setOptions({ sizes, colours })
    }, [sizes, colours])

    useEffect(() => {
        if (
            category &&
            CATEGORIES.find(({ value }) => value.includes(category))
        ) {
            setCategories([category])
        }
    }, [category])

    return (
        <Container>
            <Group pos="relative" align="start" spacing="xl">
                <Filters />

                <Stack pos="relative" sx={{ flex: 1 }}>
                    <Group position="apart">
                        <Title order={2}>Men's Tops</Title>

                        <Group>
                            <Text color="dimmed">
                                {productsTotal}
                                {productsTotal === 1 ? ' result' : ' results'}
                            </Text>

                            <SortProducts />
                        </Group>
                    </Group>

                    <Products setProductsTotal={setProductsTotal} />
                </Stack>
            </Group>
        </Container>
    )
}
