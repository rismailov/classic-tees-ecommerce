import { forwardRef } from 'react'
import { Button, createPolymorphicComponent, DefaultProps } from '@mantine/core'

interface ButtonProps {
    children: React.ReactNode
}

// Create intermediate component with default ref type and props
const _Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...others }, ref) => (
        <Button
            ref={ref}
            fz="md"
            color="gray"
            size="lg"
            sx={(theme) => ({
                background: theme.colors.dark[7],
                ':hover': {
                    background: theme.colors.dark[5],
                },
            })}
            {...others}
        >
            {children}
        </Button>
    ),
)

// createPolymorphicComponent accepts two types: default element and component props
// all other props will be added to component type automatically
export const DarkButton = createPolymorphicComponent<
    'button',
    ButtonProps & DefaultProps
>(_Button)
