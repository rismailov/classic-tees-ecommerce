import {
    ActionIcon,
    Box,
    Container,
    Divider,
    Group,
    Header as MantineHeader,
    Indicator,
    UnstyledButton,
} from '@mantine/core'
import { Logo } from './Logo'
import { Menu } from './Menu'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { UserDropdown } from './UserDropdown'
import Link from 'next/link'
import useUiStore from '@/lib/store/ui.store'
import useCartStore from '@/lib/store/cart.store'

export const Header = () => {
    const items = useCartStore((state) => state.items)
    const toggleCart = useUiStore((state) => state.toggleCart)

    return (
        <MantineHeader fixed height={60}>
            <Container>
                <Group sx={{ height: '100%' }} position="apart">
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
                        <UserDropdown />

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
                                <AiOutlineShoppingCart />
                            </ActionIcon>
                        </Indicator>
                    </Group>
                </Group>
            </Container>
        </MantineHeader>
    )
}
