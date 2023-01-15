import { useState } from 'react'
import {
    AppShell,
    Navbar,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    NavLink,
    Group,
    Box,
} from '@mantine/core'
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export const AdminLayout = ({ children }: { children: ReactNode }) => {
    const theme = useMantineTheme()
    const [opened, setOpened] = useState(false)
    const pathname = usePathname() ?? ''

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                <Navbar
                    p="md"
                    hiddenBreakpoint="sm"
                    hidden={!opened}
                    width={{ sm: 200, lg: 250 }}
                    sx={{
                        'a, button': {
                            fontWeight: 500,
                            borderRadius: theme.radius.sm,
                            '&[data-active="true"]': {
                                pointerEvents: 'none',
                            },
                        },
                    }}
                >
                    {/* PRODUCTS */}
                    <NavLink
                        label="Products"
                        component={Link}
                        href="/admin/products"
                        active={pathname.includes('products')}
                    />

                    {/* COLOURS */}
                    <NavLink
                        label="Colours"
                        component={Link}
                        href="/admin/colours"
                        active={pathname.includes('colours')}
                    />
                </Navbar>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md" px="xl">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <MediaQuery
                            largerThan="sm"
                            styles={{ display: 'none' }}
                        >
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>

                        <Group position="apart">
                            <Text>Logo</Text>
                        </Group>
                    </div>
                </Header>
            }
        >
            <Box px="md" py="xs">
                {children}
            </Box>
        </AppShell>
    )
}
