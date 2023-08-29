import { Stack, Text, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { ReactNode } from 'react'

export const CategoryItem = ({
    categoryIcon,
    title,
}: {
    categoryIcon: ReactNode
    title: string
}) => {
    return (
        <UnstyledButton component={Link} href="/shop">
            <Stack
                align="center"
                spacing={5}
                sx={(theme) => ({
                    color: theme.colors.dark[6],
                    transition: 'color 0.2s ease 0s',
                    svg: {
                        width: 75,
                        height: 75,
                        fill: theme.colors.dark[6],
                    },

                    ':hover': {
                        color: theme.colors.orange[6],
                        svg: {
                            fill: theme.colors.orange[6],
                        },
                    },
                })}
            >
                {categoryIcon}

                <Text size="lg" weight={500}>
                    {title}
                </Text>
            </Stack>
        </UnstyledButton>
    )
}
