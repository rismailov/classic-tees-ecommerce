import { CATEGORIES } from '@/lib/constants'
import { Group, UnstyledButton } from '@mantine/core'
import Link from 'next/link'

export const Menu = () => {
    return (
        <Group>
            {CATEGORIES.map(({ value, label }) => (
                <UnstyledButton
                    component={Link}
                    href={{
                        pathname: '/shop',
                        query: {
                            category: value,
                        },
                    }}
                    // @note: hides query param from URL
                    as="/shop"
                    key={value}
                >
                    {label}
                </UnstyledButton>
            ))}

            <UnstyledButton component={Link} href="/admin/products">
                Admin
            </UnstyledButton>
        </Group>
    )
}
