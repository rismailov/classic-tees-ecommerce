import { Box, Divider, Stack, Text, Title } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useStyles } from './AuthLayout.styles'

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { classes } = useStyles()
    const { pathname } = useRouter()

    return (
        <Stack align="center" spacing={5} pt={45}>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={pathname}
                    className={classes.descriptionText}
                    initial={{ y: 3, opacity: 0 }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.5 },
                    }}
                    exit={{
                        y: -3,
                        opacity: 0,
                        transition: { duration: 0.1 },
                    }}
                    transition={{
                        type: 'tween',
                        ease: 'easeIn',
                    }}
                >
                    {pathname.includes('login')
                        ? 'Login to enjoy full services.'
                        : 'Join us to get our newsletters, discounts and more!'}
                </motion.span>
            </AnimatePresence>

            <Divider mt="md" sx={{ width: '100%', maxWidth: '50vw' }} />

            <Stack p="md" pos="relative" sx={{ borderRadius: 5 }}>
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
        </Stack>
    )
}
