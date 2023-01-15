import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
    item: {
        background: 'transparent',
        transition: 'background 0s',
        border: 'none',
        borderRadius: 0,
    },

    content: {
        padding: 0,
        paddingBottom: theme.spacing.md,
    },

    control: {
        padding: 0,
        height: 50,
    },

    chevron: {
        transition: 'none',
        '&[data-rotate]': {
            transform: 'rotate(180deg)',
        },
    },
}))
