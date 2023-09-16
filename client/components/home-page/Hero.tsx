import { Box, Button, Container, Group, Stack, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import heroImage from './../../../public/hero/hero-image.webp'

export const Hero = () => {
    return (
        <Box
            pos="relative"
            sx={(theme) => ({ background: theme.colors.gray[0] })}
        >
            <Container>
                <Group noWrap align="stretch" mih="60vh">
                    {/* CTA */}
                    <Stack spacing={0} w="50%" py="xl" justify="center">
                        <Title fz={45} fw={800}>
                            Gifts he'll feel good in
                        </Title>

                        <Title fz={25} weight={400} opacity={0.8}>
                            Confidence looks good on you.
                        </Title>

                        <Button
                            component={Link}
                            href="/shop"
                            mt="xl"
                            size="lg"
                            sx={{ alignSelf: 'start' }}
                            fw={600}
                        >
                            Shop now
                        </Button>
                    </Stack>

                    {/* Image here */}
                    <Box
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '50%',
                        }}
                    >
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
                </Group>
            </Container>
        </Box>
    )
}
