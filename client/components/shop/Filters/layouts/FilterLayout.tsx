import { Accordion, Title } from '@mantine/core'
import { ReactNode } from 'react'

export const FilterLayout = ({
    value,
    title,
    children,
}: {
    value: string
    title: string
    children: ReactNode
}) => {
    return (
        <Accordion.Item value={value}>
            <Accordion.Control>
                <Title order={5}>{title}</Title>
            </Accordion.Control>

            <Accordion.Panel>{children}</Accordion.Panel>
        </Accordion.Item>
    )
}
