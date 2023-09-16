import { Card, CardProps, Title } from '@mantine/core'
import React, { ReactNode } from 'react'

export const SectionLayout = ({
    title,
    children,
    ...rest
}: {
    title?: string
    children: ReactNode
} & CardProps) => {
    return (
        <Card withBorder p="xl" {...rest}>
            {title && (
                <Title mb="md" order={4} opacity={0.4}>
                    {title}
                </Title>
            )}

            {children}
        </Card>
    )
}
