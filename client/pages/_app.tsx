import { AppLayout } from '@/components/layouts/AppLayout'
import { QCProvider } from '@/context/query-client-provider'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Manrope } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'
import '../styles/globals.css'
import { slideDown } from '@/lib/mantine/transitions'

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export const manrope = Manrope({
    weight: ['500', '700', '800'],
    subsets: ['latin', 'cyrillic'],
})

export default function App(
    props: AppProps & {
        Component: NextPageWithLayout
    },
) {
    const { Component, pageProps } = props
    const getLayout = Component.getLayout ?? ((page) => page)
    const pageWithLayout = getLayout(<Component {...pageProps} />)

    return (
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
                primaryColor: 'orange',
                primaryShade: 8,
                loader: 'oval',
                cursorType: 'pointer',
                defaultGradient: { from: 'red', to: 'yellow', deg: 45 },
                fontFamily: manrope.style.fontFamily + ' !important',
                fontSizes: { md: 15 },
                defaultRadius: 'md',
                components: {
                    Input: {
                        defaultProps: {
                            variant: 'filled',
                            spellCheck: false,
                        },

                        styles: (theme) => {
                            return {
                                input: {
                                    transition: 'none',

                                    '&:focus, &:focus-within': {
                                        borderColor: 'transparent !important',
                                        '&:not([readonly])': {
                                            background:
                                                theme.colorScheme === 'dark'
                                                    ? theme.colors.dark[6]
                                                    : theme.white,
                                            boxShadow: `0 0 0 0.1rem ${theme.fn.primaryColor()}`,
                                        },
                                    },

                                    '&[data-invalid]': {
                                        background:
                                            theme.colorScheme === 'dark'
                                                ? theme.colors.dark[6]
                                                : theme.white,
                                        boxShadow: `0 0 0 0.01rem ${theme.fn.themeColor(
                                            'red',
                                        )}`,

                                        ':focus': {
                                            boxShadow: `0 0 0 0.05rem ${theme.fn.themeColor(
                                                'red',
                                            )}`,
                                        },
                                    },

                                    '&[data-with-icon="true"]': {
                                        paddingLeft: 40,
                                    },
                                },

                                icon: {
                                    marginLeft: 2,
                                },
                            }
                        },
                    },

                    Container: {
                        defaultProps: {
                            size: 1200,
                        },

                        styles: (theme) => ({
                            root: {
                                height: '100%',
                            },
                        }),
                    },

                    Checkbox: {
                        defaultProps: {
                            radius: 'sm',
                            size: 'sm',
                        },
                        styles: (theme) => ({
                            label: {
                                paddingLeft: 8,
                                fontSize: theme.fontSizes.md,
                                display: 'inline-block',
                                paddingBottom: 3,
                            },
                            inner: {
                                width: '1.1rem',
                                height: '1.1rem',
                                marginTop: 1,
                            },
                            input: {
                                transition: 'none',
                                width: '1.1rem',
                                height: '1.1rem',
                                '&:checked': {
                                    background:
                                        theme.colorScheme === 'light'
                                            ? theme.other.bgDark
                                            : undefined,
                                    '+ .___ref-icon': {
                                        color:
                                            theme.colorScheme === 'dark'
                                                ? theme.black
                                                : undefined,
                                    },
                                },
                            },
                            icon: {
                                transition: 'none',
                                padding: 0.5,
                            },
                        }),
                    },

                    Table: {
                        defaultProps: {
                            fontSize: 'md',
                            verticalSpacing: 'md',
                        },
                    },

                    Overlay: {
                        defaultProps: {
                            zIndex: 10,
                        },
                    },

                    Menu: {
                        defaultProps: {
                            position: 'bottom-end',
                            transition: slideDown,
                            transitionDuration: 0,
                        },
                    },
                },
            }}
        >
            <NotificationsProvider position="bottom-right">
                <QCProvider>
                    <AppLayout children={pageWithLayout} />
                </QCProvider>
            </NotificationsProvider>
        </MantineProvider>
    )
}
