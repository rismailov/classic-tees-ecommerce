import { getProducts } from '@/lib/api/products'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import useFiltersStore from '@/lib/store/filters.store'
import { Center, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { ProductCard } from './ProductCard/ProductCard'
import { AnimatePresence, motion } from 'framer-motion'
import shallow from 'zustand/shallow'
import { sleep } from '@/utils'
import { useStyles } from './Products.styles'
import { useMemo } from 'react'
import { LoadMoreButton } from './LoadMoreButton'

export const Products = ({
    setProductsTotal: setProductsCount,
}: {
    setProductsTotal: (count: number) => void
}) => {
    const { classes } = useStyles()

    const skeletonCards = useMemo(() => {
        const arr = []

        for (let i = 0; i <= 5; i++) {
            arr.push(
                <div key={i}>
                    <Skeleton height={350} radius="lg" />

                    <Stack mt="md" spacing="xs">
                        <Skeleton height={16} />
                        <Skeleton height={16} />
                        <Skeleton height={16} />
                    </Stack>
                </div>,
            )
        }

        return arr
    }, [])

    const params = useFiltersStore(
        (state) => ({
            categories: state.categories,
            sizes: state.sizes,
            colours: state.colours,
            price: state.price,
            sort: state.sort,
            limit: state.limit,
        }),
        shallow,
    )

    const { data, isLoading } = useQuery({
        queryKey: [REACT_QUERY_PRODUCTS_KEY, params],
        queryFn: async () => {
            // Delay the first request only.
            // We know it's first because we have enabled the "keepPreviousData" option.
            // This delay is only needed for skeleton animation.
            if (!products) {
                await sleep()
            }

            return getProducts(params)
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        onSuccess(data) {
            setProductsCount(data.meta.total)
        },
    })

    const { data: products, meta } = data || {}

    // Only show skeletons on initial load
    if (isLoading) {
        return (
            // prettier-ignore
            <div className={classes.gridWrapper}>
                {skeletonCards}
            </div>
        )
    }

    if (!products) {
        return (
            // prettier-ignore
            <Text color="red">
                Something went wrong fetching products...
            </Text>
        )
    }

    if (!products.length) {
        return (
            <Center
                sx={{
                    flex: 1,
                    height: 'calc(100vh - 100px) !important',
                }}
            >
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Center h="50vh">
                            <Title order={3} weight={400}>
                                <Text inherit color="dimmed">
                                    No results found...
                                </Text>
                            </Title>
                        </Center>
                    </motion.div>
                </AnimatePresence>
            </Center>
        )
    }

    return (
        <Stack spacing="xl">
            <div className={classes.gridWrapper}>
                <AnimatePresence mode="popLayout">
                    {products.map((product) => (
                        <motion.div
                            layout
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: 1,
                                transition: { duration: 0.2 },
                            }}
                            exit={{
                                opacity: 0,
                                transition: { duration: 0 },
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {meta && products.length < meta.total && (
                // Track products length to stop loading spinner animation
                <LoadMoreButton productsCount={products.length} />
            )}
        </Stack>
    )
}
