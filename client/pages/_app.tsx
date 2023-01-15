import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from '@mantine/core'
import { IconContext } from 'react-icons'
import theme from '../lib/mantine/theme'
import { getCookie, setCookie } from 'cookies-next'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { GetServerSidePropsContext, NextPage } from 'next'
import { NotificationsProvider } from '@mantine/notifications'
import { QCProvider } from '@/context/query-client-provider'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import { AppLayout } from '@/components/layouts/AppLayout'
import { usePathname } from 'next/navigation'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export default function App(
    props: AppProps & {
        colorScheme: ColorScheme
        Component: NextPageWithLayout
    },
) {
    const { Component, pageProps } = props
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        props.colorScheme,
    )

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme =
            value || (colorScheme === 'dark' ? 'light' : 'dark')
        setColorScheme(nextColorScheme)

        // when color scheme is updated save it to cookie
        setCookie('mantine-color-scheme', nextColorScheme, {
            maxAge: 60 * 60 * 24 * 30,
        })
    }

    const pathname = usePathname() ?? ''
    const getLayout = Component.getLayout ?? ((page) => page)
    const pageWithLayout = getLayout(<Component {...pageProps} />)

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    ...theme,
                    colorScheme: colorScheme,
                }}
            >
                <NotificationsProvider position="bottom-right">
                    <IconContext.Provider value={{ size: '20px' }}>
                        <QCProvider>
                            {pathname.includes('admin') ? (
                                <AdminLayout children={pageWithLayout} />
                            ) : (
                                <AppLayout children={pageWithLayout} />
                            )}
                        </QCProvider>
                    </IconContext.Provider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    )
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
})
