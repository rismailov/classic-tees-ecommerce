import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
    reviewCard: {
        border: `1px solid ${theme.colors.gray[2]}`,
        borderRadius: theme.radius.lg,

        '.review-card': {
            width: '100%',
        },
        '.review-card__client-data': {
            width: '100%',
        },
        '.review-card__review': {
            width: '100%',
        },

        [`@media (min-width: 700px)`]: {
            '.review-card': {
                flexWrap: 'nowrap',
                width: 700,
            },
            '.review-card__client-data': {
                width: '30%',
            },
            '.review-card__review': {
                width: '70%',
            },
        },
    },

    readTheRestButton: {
        color: theme.fn.primaryColor(),
        fontWeight: 500,
        ':hover': {
            textDecoration: 'underline',
        },
    },

    userAvatar: {
        borderRadius: theme.radius.xl,
        width: 50,
        height: 50,
        overflow: 'hidden',
        border: `1.5px solid ${theme.fn.rgba(
            theme.fn.themeColor('orange'),
            0.3,
        )}`,
        background: theme.fn.rgba(theme.colors.orange[7], 0.1),
        padding: theme.spacing.sm,
        svg: {
            width: '100%',
            height: '100%',
            color: theme.fn.themeColor('orange'),
        },
    },
}))
