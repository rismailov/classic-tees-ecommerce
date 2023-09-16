import { CATEGORIES } from '@/lib/constants'
import { Group, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Menu = () => {
    const { asPath: route } = useRouter()

    return (
        <Group
            sx={{
                'a[data-active="true"]': {
                    fontWeight: 500,
                },
            }}
        >
            {route.includes('admin') ? (
                <>
                    <UnstyledButton component={Link} href="/shop">
                        Shop
                    </UnstyledButton>

                    <UnstyledButton
                        component={Link}
                        href="/admin/products"
                        data-active={route.includes('/admin/products')}
                    >
                        Products
                    </UnstyledButton>

                    <UnstyledButton
                        component={Link}
                        href="/admin/colours"
                        data-active={route.includes('/admin/colours')}
                    >
                        Colours
                    </UnstyledButton>
                </>
            ) : (
                <>
                    {CATEGORIES.map(({ value, label }) => (
                        <UnstyledButton
                            component={Link}
                            href={{
                                pathname: '/shop',
                                query: {
                                    categories: [value],
                                },
                            }}
                            // hides query params from URL
                            as="/shop"
                            key={value}
                        >
                            {label}
                        </UnstyledButton>
                    ))}

                    <UnstyledButton component={Link} href="/admin/products">
                        Admin
                    </UnstyledButton>
                </>
            )}
        </Group>
    )
}
