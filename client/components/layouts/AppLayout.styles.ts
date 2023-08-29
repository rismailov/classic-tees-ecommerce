import { createStyles } from '@mantine/core'

export const useStyles = createStyles(
    (_theme, { isHomePage }: { isHomePage: boolean }) => ({
        wrapper: {
            position: 'relative',
            height: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: isHomePage ? 60 : 90,
            footer: {
                marginTop: 60,
            },
        },
    }),
)
