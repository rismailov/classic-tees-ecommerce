import useCartStore from '@/lib/store/cart.store'
import {
    ActionIcon,
    Anchor,
    Center,
    Container,
    Divider,
    Group,
    Indicator,
    Header as MantineHeader,
    Stack,
    UnstyledButton,
} from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AuthDropdown } from './AuthDropdown'
import { Logo } from './Logo'
import { Menu } from './Menu'

export const Header = () => {
    const pathname = usePathname() ?? ''

    const items = useCartStore((state) => state.items)
    const toggleCart = useCartStore((state) => state.toggleIsCartOpened)
    const isAdminDashboard = pathname.includes('admin')

    return (
        <MantineHeader fixed height={isAdminDashboard ? 60 : 90} zIndex={100}>
            <Stack spacing={0} h="100%">
                {!isAdminDashboard && (
                    <Center
                        py={5}
                        sx={(theme) => ({
                            background: theme.fn.themeColor('orange'),
                            fontWeight: 'bold',
                            fontSize: theme.fontSizes.xs,
                            textTransform: 'uppercase',
                        })}
                    >
                        <Anchor
                            component={Link}
                            href={{
                                pathname: '/shop',
                                query: {
                                    sort: 'date-desc',
                                },
                            }}
                            as="/shop"
                            className="animate-underline-on-hover animate-underline-on-hover__white"
                            sx={(theme) => ({
                                color: theme.white,
                                '&:hover': { textDecoration: 'none' },
                            })}
                        >
                            shop new arrivals
                        </Anchor>
                    </Center>
                )}

                <Container w="100%" sx={{ flex: 1 }}>
                    <Group
                        h="100%"
                        position="apart"
                        sx={{
                            'a, button': {
                                fontSize: 16,
                            },
                        }}
                    >
                        <Group spacing="xl">
                            <UnstyledButton
                                component={Link}
                                href="/"
                                sx={{
                                    display: 'inline-block',
                                    transition: 'opacity 0.2s ease-out',
                                    ':hover': {
                                        opacity: 0.8,
                                        transition: 'opacity 0.2s ease-in',
                                    },
                                }}
                            >
                                <Logo />
                            </UnstyledButton>

                            <Divider orientation="vertical" />

                            <Menu />
                        </Group>

                        <Group position="right" spacing="xs">
                            <AuthDropdown />

                            {!isAdminDashboard && (
                                <Indicator
                                    label={items.reduce(
                                        (prev, cur) => prev + cur.amount,
                                        0,
                                    )}
                                    size={18}
                                    offset={3}
                                    disabled={!items.length}
                                    styles={{
                                        indicator: { fontWeight: 600 },
                                    }}
                                >
                                    <ActionIcon onClick={toggleCart}>
                                        <IconShoppingCart size={18} />
                                    </ActionIcon>
                                </Indicator>
                            )}
                        </Group>
                    </Group>
                </Container>
            </Stack>
        </MantineHeader>
    )
}
