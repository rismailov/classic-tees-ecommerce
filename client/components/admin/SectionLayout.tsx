import { Card, Title } from '@mantine/core'
import React, { ReactNode } from 'react'

export const SectionLayout = ({
    title,
    children,
}: {
    title: string
    children: ReactNode
}) => {
    return (
        <Card radius="xl" shadow="xl" p="xl">
            <Title mb="md" order={4} opacity={0.4} weight={600}>
                {title}
            </Title>

            {children}
        </Card>
    )
}
