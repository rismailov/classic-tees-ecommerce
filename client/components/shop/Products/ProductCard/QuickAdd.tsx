import useCartStore from '@/lib/store/cart.store'
import useUiStore from '@/lib/store/ui.store'
import { sleep } from '@/utils'
import { Box, Text, Group, Stack, ActionIcon } from '@mantine/core'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiPlus } from '@react-icons/all-files/fi/FiPlus'
import { FiX } from '@react-icons/all-files/fi/FiX'
import { SelectSizeActionIcon } from './quick-add/SelectSizeActionIcon'
import { useStyles } from './QuickAdd.styles'
import { UserProductIndexEntity } from '@/types/entities/product.entity'

type TSize = UserProductIndexEntity['sizes'][number]

export const QuickAdd = ({
    product,
    isLoading,
    setIsLoading,
}: {
    product: UserProductIndexEntity
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
            id: `${product.id}-${size.value}`,
            imageUrl: product.images[0].url,
            name: product.name,
            size: { id: size.value, name: size.label },
            price: product.price.discounted ?? product.price.initial,
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
                                    <SelectSizeActionIcon
                                        key={size.value}
                                        size={size}
                                        isSelected={
                                            size.value == selectedSize?.value
                                        }
                                        isLoading={isLoading}
                                        classes={classes.size}
                                        onAddItem={() => onAddItem(size)}
                                    />
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
