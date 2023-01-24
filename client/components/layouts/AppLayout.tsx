import { Box } from '@mantine/core'
import { ReactNode } from 'react'
import { Cart } from '../app/Cart/Cart'
import { Header } from '../app/Header'

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box id="wrapper" pos="relative" py={80} mih="100vh" h="100%">
            <Header />

            <Cart />

            <Box>{children}</Box>
        </Box>
    )
}
