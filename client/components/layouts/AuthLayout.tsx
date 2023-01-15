import { Box, Divider, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { pathname } = useRouter()
    const [isLoginPage, toggleIsLoginPage] = useState(
        pathname.includes('login'),
    )

    useEffect(() => {
        toggleIsLoginPage(pathname.includes('login'))
    }, [pathname])

    return (
        <Stack align="center" spacing={5} pt={45}>
            <Title order={3} sx={{ fontWeight: 400, opacity: 0.7 }}>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={pathname}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {isLoginPage
                            ? 'Login to enjoy full services.'
                            : 'Join us to get our newsletters, discounts and more!'}
                    </motion.div>
                </AnimatePresence>
            </Title>

            <Divider my="md" sx={{ width: '100%', maxWidth: '50vw' }} />

            <Stack align="center" spacing={5}>
                <Title>
                    {pathname.includes('login') ? 'Login' : 'Register'}
                </Title>

                <Text size="lg">
                    or{' '}
                    <Text
                        inherit
                        component={Link}
                        href={
                            pathname.includes('login')
                                ? '/auth/register'
                                : '/auth/login'
                        }
                        variant="gradient"
                    >
                        {pathname.includes('login')
                            ? 'create a free account'
                            : 'login with your account'}
                    </Text>
                </Text>
            </Stack>

            <Box
                mt="md"
                sx={(theme) => ({
                    width: '100%',
                    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
                        width: 400,
                    },
                })}
            >
                {children}
            </Box>
        </Stack>
    )
}
