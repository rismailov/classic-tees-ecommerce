import { useAuth } from '@/hooks/use-auth'
import {
    ActionIcon,
    Box,
    Button,
    Center,
    Divider,
    Group,
    Menu,
    Stack,
    Text,
    Tooltip,
} from '@mantine/core'
import {
    IconEdit,
    IconLogout,
    IconShoppingCart,
    IconUser,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const AuthDropdown = () => {
    const { user, logout } = useAuth()
    const router = useRouter()
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
            styles={(theme) => ({
                item: {
                    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
                },
            })}
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
                    <IconUser size={20} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown sx={(theme) => ({ borderRadius: theme.radius.md })}>
                <Box p="sm">
                    {user ? (
                        <Group noWrap>
                            <Center
                                sx={(theme) => ({
                                    width: 40,
                                    height: 40,
                                    borderRadius: theme.radius.xl,
                                    overflow: 'hidden',
                                    background: theme.colors.orange[1],
                                    color: theme.colors.orange[5],
                                    fontWeight: 500,
                                    lineHeight: 1,
                                })}
                            >
                                {user.initials}
                            </Center>

                            <Stack spacing={5}>
                                <Text
                                    size="sm"
                                    weight={500}
                                    color="dark"
                                    lh={1}
                                >
                                    {user.fullName}
                                </Text>

                                <Tooltip label={user.email.full}>
                                    <Text
                                        size="xs"
                                        color="dimmed"
                                        lh={1}
                                        title={user.email.full}
                                    >
                                        {user.email.excerpt}
                                    </Text>
                                </Tooltip>
                            </Stack>
                        </Group>
                    ) : (
                        <Group
                            grow
                            spacing="xs"
                            onClick={() => setOpened(false)}
                        >
                            <Button
                                component={Link}
                                href="/auth/login"
                                variant="light"
                                size="sm"
                                color="dark"
                                sx={(theme) => ({
                                    border: `1px solid ${theme.colors.gray[4]}`,
                                    color: theme.colors.dark[4],
                                    background: theme.white,
                                    ':hover': {
                                        background: theme.colors.gray[0],
                                    },
                                })}
                            >
                                Log in
                            </Button>

                            <Button
                                component={Link}
                                href="/auth/register"
                                color="dark"
                                size="sm"
                            >
                                Sign up
                            </Button>
                        </Group>
                    )}
                </Box>

                <Divider />

                {/*Nav*/}
                <Menu.Item icon={<IconEdit size={17} />}>Account</Menu.Item>
                <Menu.Item icon={<IconShoppingCart size={17} />}>
                    Cart
                </Menu.Item>
                {user && (
                    <Menu.Item
                        onClick={async () => {
                            await logout()
                            router.push('/auth/login')
                        }}
                        icon={<IconLogout size={17} />}
                        color="red"
                    >
                        Logout
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    )
}
