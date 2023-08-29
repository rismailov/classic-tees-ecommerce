import useCartStore from '@/lib/store/cart.store'
import useUiStore from '@/lib/store/ui.store'
import {
    ActionIcon,
    Container,
    Divider,
    Group,
    Indicator,
    Header as MantineHeader,
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
    const toggleCart = useUiStore((state) => state.toggleCart)

    return (
        <MantineHeader fixed height={60}>
            <Container>
                <Group
                    position="apart"
                    sx={{
                        height: '100%',
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

                        {!pathname.includes('admin') && (
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
        </MantineHeader>
    )
}
