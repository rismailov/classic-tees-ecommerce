import { Card, CardProps, Title } from '@mantine/core'
import React, { ReactNode } from 'react'

export const SectionLayout = ({
    title,
    children,
    ...rest
}: {
    title: string
    children: ReactNode
} & CardProps) => {
    return (
        <Card radius="xl" shadow="xl" p="xl" {...rest}>
            <Title mb="md" order={4} opacity={0.4} weight={500}>
                {title}
            </Title>

            {children}
        </Card>
    )
}
