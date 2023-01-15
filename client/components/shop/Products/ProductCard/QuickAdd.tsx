import useCartStore from '@/lib/store/cart.store'
import useUiStore from '@/lib/store/ui.store'
import { ProductEntity } from '@/types/entities/product.entity'
import { sleep } from '@/utils'
import { Box, Text, Group, Stack, ActionIcon } from '@mantine/core'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiCheck, FiPlus, FiX } from 'react-icons/fi'
import { useStyles } from './QuickAdd.styles'

type TSize = ProductEntity['sizes'][number]

export const QuickAdd = ({
    product,
    isLoading,
    setIsLoading,
}: {
    product: ProductEntity
    isLoading: boolean
    setIsLoading: (v: boolean) => void
}) => {
    const toggleCart = useUiStore((state) => state.toggleCart)
    const addItem = useCartStore((state) => state.addItem)

    // @note this is only needed for animation
    const [selectedSize, setSelectedSize] = useState<TSize | null>(null)

    const [isSizeSelectorOpened, setSizeSelectorOpened] = useState(false)
    const toggleSizeSelectorOpened = () =>
        setSizeSelectorOpened((prev) => !prev)

    const { classes } = useStyles({ isSizeSelectorOpened })

    async function onAddItem(size: TSize) {
        // @note everything except the "important part" is
        // only needed for animation purposes
        setSelectedSize(size)
        setIsLoading(true)

        await sleep()

        setIsLoading(false)

        await sleep()

        setSelectedSize(null)
        setIsLoading(false)

        // important part start
        addItem({
            id: `${product.id}-${size.id}`,
            imageUrl: product.images[0].url,
            name: product.name,
            size,
            price: product.price,
            amount: 1,
            colour: {
                id: product.colour.value,
                name: product.colour.label,
            },
        })
        // important part end

        toggleSizeSelectorOpened()

        await sleep()

        toggleCart()
    }

    return (
        <Box className={classes.mainWrapper}>
            <Box pos="relative" w="100%" h="100%">
                <Box
                    data-quick-add-wrapper
                    className={classes.quickAddWrapper}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}
                    component={motion.div}
                    style={{ overflow: 'hidden' }}
                    animate={{ height: isSizeSelectorOpened ? 110 : 40 }}
                >
                    {isSizeSelectorOpened ? (
                        <Stack
                            h="100%"
                            p="md"
                            pl="lg"
                            spacing="xs"
                            sx={{ cursor: 'default' }}
                        >
                            <Group position="apart">
                                <Text fw={500} size="sm">
                                    Select size:
                                </Text>

                                <ActionIcon
                                    size="md"
                                    onClick={toggleSizeSelectorOpened}
                                >
                                    <FiX size="15" />
                                </ActionIcon>
                            </Group>

                            <Group spacing={5}>
                                {product.sizes.map((size) => (
                                    <ActionIcon
                                        key={size.id}
                                        onClick={() => onAddItem(size)}
                                        loading={
                                            isLoading &&
                                            size.id === selectedSize?.id
                                        }
                                        size="lg"
                                        radius="xl"
                                        variant="outline"
                                        className={classes.size}
                                        sx={(theme) => ({
                                            ...(size.id === selectedSize?.id &&
                                                !isLoading && {
                                                    background: theme.fn.rgba(
                                                        theme.fn.themeColor(
                                                            'orange',
                                                        ),
                                                        0.1,
                                                    ),
                                                    ':hover': {
                                                        background:
                                                            theme.fn.themeColor(
                                                                'orange',
                                                            ),
                                                    },
                                                    borderColor:
                                                        theme.fn.themeColor(
                                                            'orange',
                                                        ),
                                                    svg: {
                                                        color: theme.fn.themeColor(
                                                            'orange',
                                                        ),
                                                    },
                                                }),
                                        })}
                                    >
                                        {size.id !== selectedSize?.id ? (
                                            size.name.toUpperCase()
                                        ) : (
                                            <FiCheck
                                                size={17}
                                                strokeWidth={2}
                                            />
                                        )}
                                    </ActionIcon>
                                ))}
                            </Group>
                        </Stack>
                    ) : (
                        <Group
                            h="100%"
                            align="center"
                            position="center"
                            role="button"
                            onClick={toggleSizeSelectorOpened}
                        >
                            <Text fz={14} fw={500}>
                                Quick add
                            </Text>

                            <FiPlus data-plus-icon size={16} />
                        </Group>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
