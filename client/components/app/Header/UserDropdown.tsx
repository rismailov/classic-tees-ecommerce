import {
    Button,
    Group,
    Menu,
    Text,
    Divider,
    Stack,
    ActionIcon,
} from '@mantine/core'
import {
    AiOutlineEdit,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from 'react-icons/ai'
import { useState } from 'react'
import Link from 'next/link'

export const UserDropdown = () => {
    const [opened, setOpened] = useState<boolean>(false)

    return (
        <Menu
            withinPortal
            withArrow
            opened={opened}
            onChange={setOpened}
            width={250}
            offset={25}
            shadow="xl"
        >
            <Menu.Target>
                <ActionIcon
                    sx={(theme) => ({
                        '&[data-expanded]': {
                            backgroundColor: opened
                                ? theme.colors.gray[1]
                                : undefined,
                        },
                    })}
                >
                    <AiOutlineUser />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown
                p="lg"
                sx={(theme) => ({ borderRadius: theme.radius.md })}
            >
                <Stack>
                    <Text size="lg" weight={700} sx={{ lineHeight: 1.2 }}>
                        Welcome to Classic Tees
                    </Text>

                    <Group grow spacing="xs" onClick={() => setOpened(false)}>
                        <Button
                            component={Link}
                            href="/auth/login"
                            variant="light"
                            size="sm"
                        >
                            Log in
                        </Button>

                        <Button
                            component={Link}
                            href="/auth/register"
                            variant="filled"
                            size="sm"
                        >
                            Sign up
                        </Button>
                    </Group>
                </Stack>

                <Divider my="sm" />

                {/*Nav*/}
                <Stack spacing={5}>
                    <Menu.Item icon={<AiOutlineEdit />}>Account</Menu.Item>
                    <Menu.Item icon={<AiOutlineShoppingCart />}>Cart</Menu.Item>
                </Stack>
            </Menu.Dropdown>
        </Menu>
    )
}
