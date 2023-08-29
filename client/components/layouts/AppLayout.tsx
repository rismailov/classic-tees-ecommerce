import { Box } from '@mantine/core'
import { ReactNode } from 'react'
import { Cart } from '../app/Cart/Cart'
import { Footer } from '../app/Footer'
import { Header } from '../app/Header'
import { useStyles } from './AppLayout.styles'

export const AppLayout = ({ children }: { children: ReactNode }) => {
    const { classes } = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Header />
            <Cart />
            <Box mt={60}>{children}</Box>
            <Footer />
        </Box>
    )
}
