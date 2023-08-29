import { Box } from '@mantine/core'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Cart } from '../app/Cart/Cart'
import { Footer } from '../app/Footer'
import { Header } from '../app/Header'
import { useStyles } from './AppLayout.styles'

export const AppLayout = ({ children }: { children: ReactNode }) => {
    const { pathname } = useRouter()
    const { classes } = useStyles({ isHomePage: pathname === '/' })

    return (
        <Box className={classes.wrapper}>
            <Header />
            <Cart />
            <Box>{children}</Box>
            <Footer />
        </Box>
    )
}
