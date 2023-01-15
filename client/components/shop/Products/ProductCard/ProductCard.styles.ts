import { createStyles } from '@mantine/core'

const transition = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const useStyles = createStyles(
    (theme, { isAddingToCart }: { isAddingToCart: boolean }) => ({
        cardAnchor: {
            width: '100%',
            display: 'inline-flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: `1px solid ${theme.colors.gray[3]}`,
            borderRadius: theme.radius.lg,
            ['div[data-quick-add-wrapper]']: {
                opacity: 0,
                transform: 'translateY(5px)',
                transition: `opacity 0.2s ${transition} ${
                    isAddingToCart ? '1.5s' : '0s'
                }, transform 0.1s ${transition} ${
                    isAddingToCart ? '1.5s' : '0s'
                }`,
            },

            ':hover': {
                ['div[data-quick-add-wrapper]']: {
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: 'none',
                },
            },
        },

        imageWrapper: {
            position: 'relative',
            width: '100%',
            height: 300,
            // borderRadius: theme.radius.lg,
            overflow: 'hidden',
            img: {
                objectFit: 'cover',
            },
        },
    }),
)
