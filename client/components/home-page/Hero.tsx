import { Box, Button, Container, Group, Stack, Title } from '@mantine/core'
import Image from 'next/image'
import heroImage from './../../../public/hero/hero-image.webp'

export const Hero = () => {
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colors.gray[1],
            })}
        >
            <Container>
                <Group noWrap align="stretch">
                    {/* CTA */}
                    <Stack
                        spacing={0}
                        mih="60vh"
                        w="50%"
                        py="xl"
                        justify="center"
                    >
                        <Title fz={50}>Gifts he'll feel good in</Title>

                        <Title fz={30} weight={400} opacity={0.8}>
                            Confidence looks good on you.
                        </Title>

                        <Button
                            mt="xl"
                            size="lg"
                            sx={{ alignSelf: 'start' }}
                            fw={600}
                        >
                            Shop now
                        </Button>
                    </Stack>

                    {/* Image here */}
                    <Stack
                        w="50%"
                        sx={{
                            position: 'absolute',
                            height: '60vh',
                            right: 0,
                            top: 60,
                            background: 'white',
                        }}
                    >
                        <Box pos="relative" w="100%" h="100%">
                            <Image
                                src={heroImage}
                                alt="Hero image"
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        </Box>
                    </Stack>
                </Group>
            </Container>
        </Box>
    )
}
