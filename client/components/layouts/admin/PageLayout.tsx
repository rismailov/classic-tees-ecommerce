import { Group, Stack, Title, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import { ReactNode } from 'react'

type TBreadcrumb =
    | {
          label: string
          href: string
      }
    | string

export const PageLayout = ({
    breadcrumbs,
    children,
    rightSide,
}: {
    breadcrumbs: TBreadcrumb[]
    children: ReactNode
    rightSide?: ReactNode
}) => {
    return (
        <Stack>
            {/* Header */}
            <Group
                position="apart"
                sx={{
                    /* set height so it won't wiggle around based on content */
                    height: 40,
                }}
            >
                <Group spacing={2}>
                    {breadcrumbs.map((breadcrumb, i) =>
                        typeof breadcrumb === 'string' ? (
                            <Group key={i} spacing={2}>
                                {/* Slash Icon */}
                                {breadcrumbs.length > 1 && (
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="0"
                                        viewBox="0 0 15 15"
                                        height="25"
                                        width="25"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.10876 14L9.46582 1H10.8178L5.46074 14H4.10876Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                )}

                                <Title order={2}>{breadcrumb}</Title>
                            </Group>
                        ) : (
                            <UnstyledButton
                                key={i}
                                component={Link}
                                href={breadcrumb.href}
                                sx={(theme) => ({
                                    color: theme.fn.primaryColor(),
                                })}
                            >
                                <Title order={2}>{breadcrumb.label}</Title>
                            </UnstyledButton>
                        ),
                    )}
                </Group>

                {rightSide && rightSide}
            </Group>

            {/* Main */}
            {children}
        </Stack>
    )
}
