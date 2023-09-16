import { Box } from '@mantine/core'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Cart } from '../app/Cart/Cart'
import { Footer } from '../app/Footer'
import { Header } from '../app/Header'
import { useStyles } from './AppLayout.styles'

export const AppLayout = ({ children }: { children: ReactNode }) => {
    const { asPath: url } = useRouter()
    const { classes } = useStyles()

    return (
        <Box className={classes.wrapper}>
            <Header />

            <Cart />

            <Box
                mt={url.includes('admin') ? 50 : 80}
                pt={url === '/' ? 0 : 40}
                pb={50}
            >
                {children}
            </Box>

            <Footer />
        </Box>
    )
}
