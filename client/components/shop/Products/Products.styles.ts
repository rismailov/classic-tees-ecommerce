import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
    gridWrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: theme.spacing.lg,

        [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
            gridTemplateColumns: '1fr 1fr',
        },

        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
            gridTemplateColumns: '1fr 1fr 1fr',
        },
    },
}))
