import { Box, Container, Group, Stack, Title, Text } from '@mantine/core'
import { motion } from 'framer-motion'

export const Footer = () => {
    return (
        <Box component="footer" py={50} bg="dark" sx={{ overflow: 'hidden' }}>
            <Container>
                <Group>
                    <Stack spacing="sm">
                        <Title order={3} weight={800} color="white">
                            Confidence looks good on you.
                        </Title>

                        <Text
                            sx={(theme) => ({
                                fontSize: 17,
                                color: theme.colors.gray[5],
                                a: {
                                    color: theme.colors.orange[5],
                                    fontWeight: 500,
                                },
                            })}
                        >
                            Shop by{' '}
                            <Text
                                span
                                component={motion.a}
                                target="_blank"
                                href="https://github.com/rismailov"
                                className="animate-underline-on-hover"
                            >
                                rismailov
                            </Text>
                            . All product images are taken from{' '}
                            <Text
                                span
                                component="a"
                                target="_blank"
                                href="https://trueclassictees.com"
                                className="animate-underline-on-hover"
                            >
                                True Classic Tees
                            </Text>
                            .
                        </Text>
                    </Stack>
                </Group>
            </Container>
        </Box>
    )
}
