import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
    mainSliderNavButton: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 'calc(50% - 50px)',
        zIndex: 2,
        borderRadius: theme.radius.xl,
        background: theme.white,
        color: theme.colors.dark[9],
        boxShadow: theme.shadows.xl,
        border: `1px solid ${theme.colors.gray[3]}`,
        ':hover': {
            background: theme.white,
        },
        '&:disabled': {
            background: theme.colors.gray[0],
            boxShadow: 'none',
        },
        svg: {
            width: 25,
            height: 25,
        },
    },

    mainSliderNavButtonLeft: {
        left: -22,
    },

    mainSliderNavButtonRight: {
        right: -22,
    },

    secondSliderNavButton: {
        height: '100%',
        maxWidth: 30,
        marginTop: 0.75, // to match image border height
        marginBottom: 0.75, // to match image border height
        userSelect: 'none',
        backgroundColor: theme.colors.gray[1],
        ':hover': {
            backgroundColor: theme.colors.gray[3],
        },
    },

    thumb: {
        height: '100%',
        userSelect: 'none',
        borderRadius: theme.radius.md,
        overflow: 'hidden',
    },
}))
