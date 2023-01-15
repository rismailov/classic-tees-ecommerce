import useCartStore from '@/lib/store/cart.store'
import useUiStore from '@/lib/store/ui.store'
import {
    Text,
    Stack,
    Center,
    Title,
    Drawer,
    Group,
    ActionIcon,
    Box,
    Divider,
} from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import { CartItem } from './CartItem'
import { FiX } from '@react-icons/all-files/fi/FiX'
import { DarkButton } from '@/components/shop/styled/DarkButton'
import { FiBox } from 'react-icons/fi'

export const Cart = () => {
    const isCartOpened = useUiStore((state) => state.isCartOpened)
    const toggleCart = useUiStore((state) => state.toggleCart)
    const items = useCartStore((state) => state.items)

    return (
        <Drawer
            opened={isCartOpened}
            onClose={toggleCart}
            withinPortal
            lockScroll={false}
            position="right"
            withCloseButton={false}
            transitionDuration={350}
            size="xl"
            styles={(theme) => ({
                overlay: {
                    background:
                        theme.fn.rgba(theme.colors.dark[5], 0.9) +
                        ' !important',
                },
                drawer: {
                    borderTopLeftRadius: theme.radius.lg,
                    borderBottomLeftRadius: theme.radius.lg,
                    overflow: 'hidden',
                },
            })}
        >
            <Stack h="100%">
                {/* header */}
                <Group position="apart" pos="relative" p="xl">
                    <Group>
                        <Title order={2}>Cart</Title>

                        <Title order={2} opacity={0.3}>
                            {items.reduce((prev, cur) => prev + cur.amount, 0)}
                        </Title>
                    </Group>

                    <ActionIcon
                        onClick={toggleCart}
                        sx={{ borderRadius: '999px' }}
                    >
                        <FiX size={20} />
                    </ActionIcon>

                    <Divider
                        sx={(theme) => ({
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            margin: `0px ${theme.spacing.xl}px`,
                            opacity: 0.5,
                        })}
                    />
                </Group>

                {/* body */}
                <Box sx={{ flex: 1, overflowY: 'auto' }} px="xl">
                    <Stack h="100%" spacing="xl" justify="space-between">
                        <Stack spacing="lg">
                            <AnimatePresence mode="popLayout">
                                {items.length ? (
                                    items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                                transition: {
                                                    duration: 0,
                                                },
                                            }}
                                        >
                                            <CartItem cartItem={item} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <Center mt="lg">
                                        <Text
                                            size="xl"
                                            weight={500}
                                            color="dimmed"
                                        >
                                            Your cart is empty
                                        </Text>
                                    </Center>
                                )}
                            </AnimatePresence>
                        </Stack>
                    </Stack>
                </Box>

                {/* footer */}
                {/* checkout */}
                <Stack spacing="xs" pos="relative" p="xl">
                    <Group position="apart">
                        <Title order={4} weight={600}>
                            Total:{' $'}
                            {items.reduce<number | string>(
                                (prev, cur) =>
                                    (
                                        +prev +
                                        parseFloat(cur.price) * cur.amount
                                    ).toFixed(2),
                                0.0,
                            )}
                        </Title>

                        <Group spacing="xs" opacity={0.75}>
                            <Text size="sm">Free shipping</Text>

                            <FiBox size={15} />
                        </Group>
                    </Group>

                    <DarkButton disabled={!items.length}>Checkout</DarkButton>

                    <Divider
                        sx={(theme) => ({
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            margin: `0px ${theme.spacing.xl}px`,
                            opacity: 0.5,
                        })}
                    />
                </Stack>
            </Stack>
        </Drawer>
    )
}
