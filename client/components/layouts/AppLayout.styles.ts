import { createStyles } from '@mantine/core'

export const useStyles = createStyles(() => ({
    wrapper: {
        position: 'relative',
        height: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}))
