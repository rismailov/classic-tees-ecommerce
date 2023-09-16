import { Filters } from '@/components/shop/Filters'
import { Products } from '@/components/shop/Products'
import { SortProducts } from '@/components/shop/Products/products-header/SortProducts'
import { getFilterOptions } from '@/lib/api/products'
import useFilterOptionsStore, {
    FilterOptions,
} from '@/lib/store/filter-options.store'
import useFiltersStore from '@/lib/store/filters.store'
import { Sort } from '@/types/product-filters/sort.product-filter'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
    return {
        props: await getFilterOptions(),
    }
}

export default function Shop({ sizes, colours }: FilterOptions) {
    // set fetched filter options
    const setOptions = useFilterOptionsStore((state) => state.setOptions)

    useEffect(() => {
        setOptions({ sizes, colours })
    }, [sizes, colours])

    // update state with query params from links (header links)
    const { query } = useRouter()
    const setCategories = useFiltersStore((state) => state.setCategories)
    const setSort = useFiltersStore((state) => state.setSort)

    useEffect(() => {
        if (query) {
            // categories will be string when user clicks header menu link
            // because there will be only one selected category and nextjs will convert it to string
            // @see Menu.tsx for code
            if (typeof query.categories == 'string') {
                setCategories([query.categories])
            }

            // categories will be undefined if user clicks "SHOP NEW ARRIVALS" link on the top header
            // that's one of the ways to "drop" the categories filter if there were any selected beforehand
            // -------------------------------------------------------------------------
            // NOTE: this condition will only run once (on initial page load only) because it's router.query dependant
            if (!query.categories) {
                setCategories([])
            }

            query.sort && setSort(query.sort as Sort)
        }
    }, [query])

    // show total products count
    const [productsTotal, setProductsTotal] = useState(0)

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
