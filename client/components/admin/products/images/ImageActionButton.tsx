import React from 'react'
import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'

export const ImageActionButton = (
    props: ActionIconProps & {
        tooltiplabel: string
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    },
) => {
    return (
        <Tooltip
            label={props.tooltiplabel}
            position="top"
            withinPortal
            withArrow
            sx={{ fontSize: 13 }}
        >
            <ActionIcon
                size="md"
                variant="light"
                {...props}
                sx={(theme) => ({
                    backgroundColor: theme.white,

                    svg: {
                        transition: 'transform 150ms ease',
                    },

                    ':hover': {
                        backgroundColor: theme.white,

                        svg: {
                            transition: 'transform 300ms ease',
                            transform: 'translateY(-1px)',
                        },
                    },
                })}
            />
        </Tooltip>
    )
}
