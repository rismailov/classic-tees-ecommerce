import { AppLayout } from '@/components/layouts/AppLayout'
import { QCProvider } from '@/context/query-client-provider'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { IconContext } from 'react-icons'
import theme from '../lib/mantine/theme'
import '../styles/globals.css'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export default function App(
    props: AppProps & {
        Component: NextPageWithLayout
    },
) {
    const { Component, pageProps } = props

    const getLayout = Component.getLayout ?? ((page) => page)
    const pageWithLayout = getLayout(<Component {...pageProps} />)

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            <NotificationsProvider position="bottom-right">
                <IconContext.Provider value={{ size: '20px' }}>
                    <QCProvider>
                        <AppLayout children={pageWithLayout} />
                    </QCProvider>
                </IconContext.Provider>
            </NotificationsProvider>
        </MantineProvider>
    )
}
