import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
    size: {
        fontSize: theme.fontSizes.xs,
        fontWeight: 600,
        borderColor: theme.colors.gray[5],
    },

    selectedSize: {
        backgroundColor: theme.colors.gray[9] + ' !important',
        borderColor: theme.colors.gray[9],
        color: theme.white,
    },
}))
