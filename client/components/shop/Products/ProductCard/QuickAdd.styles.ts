import { createStyles } from '@mantine/core'

export const useStyles = createStyles(
    (theme, { isSizeSelectorOpened }: { isSizeSelectorOpened: boolean }) => ({
        mainWrapper: {
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
        },

        quickAddWrapper: {
            position: 'absolute',
            bottom: 15,
            left: 15,
            right: 15,
            backgroundColor: theme.white,
            border: `2px solid ${
                isSizeSelectorOpened
                    ? theme.fn.themeColor('yellow')
                    : theme.black
            }`,
            borderRadius: theme.radius.md,

            ':hover': {
                borderColor: theme.fn.themeColor('yellow'),
            },
        },

        size: {
            fontSize: theme.fontSizes.xs,
            fontWeight: 600,
            borderColor: theme.colors.gray[5],
        },
    }),
)
