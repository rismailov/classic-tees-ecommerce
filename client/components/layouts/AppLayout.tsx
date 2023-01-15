import { Box } from '@mantine/core'
import React, { ReactNode } from 'react'
import { Cart } from '../app/Cart/Cart'
import { Header } from '../app/Header'

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            id="wrapper"
            sx={(theme) => ({
                position: 'relative',
                paddingTop: 60,
                minHeight: '100vh',
                height: '100%',
                background: theme.white,
            })}
        >
            <Header />

            <Cart />

            <Box>{children}</Box>
        </Box>
    )
}
