import { ReviewEntity } from '@/types/entities/review.entity'
import { Card, Center, Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { useState } from 'react'
import { useStyles } from './Review.styles'
import { IconUser } from '@tabler/icons-react'

export const Review = (review: ReviewEntity) => {
    const [showFullText, setShowFullText] = useState(false)
    const { classes } = useStyles()

    return (
        <Card p="xl" className={classes.reviewCard}>
            <Group align="start" spacing="xl" className="review-card">
                {/* client */}
                <Group className="review-card__client-data" noWrap>
                    <Center className={classes.userAvatar}>
                        <IconUser />
                    </Center>

                    <Stack spacing={0}>
                        <Text weight={600} fz={16}>
                            {review.credentials}
                        </Text>
                        <Text color="dimmed" fz={14}>
                            Verified Buyer
                        </Text>
                    </Stack>
                </Group>

                {/* review */}
                <Stack
                    className="review-card__review"
                    spacing={5}
                    sx={{ flex: 1 }}
                >
                    <Group
                        spacing="xs"
                        sx={(theme) => ({
                            svg: {
                                width: 15,
                                height: 15,
                                opacity: 0.3,
                                '&.fill': {
                                    color: theme.colors.orange[7],
                                    opacity: 1,
                                },
                            },
                        })}
                    >
                        <Group spacing={3}>
                            {[...Array(5)].map((_n, i) => (
                                <svg
                                    key={i}
                                    className={`${
                                        i + 1 <= review.stars ? 'fill' : ''
                                    }`}
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path>
                                </svg>
                            ))}
                        </Group>

                        <Text size="md" weight={600}>
                            {review.title}
                        </Text>
                    </Group>

                    <Stack spacing="xs">
                        <Text fz={16} sx={{ wordBreak: 'break-all' }}>
                            {showFullText
                                ? review.text.full
                                : review.text.excerpt}
                        </Text>

                        {review.text.excerpt !== review.text.full &&
                            !showFullText && (
                                <UnstyledButton
                                    onClick={() => setShowFullText(true)}
                                    className={classes.readTheRestButton}
                                >
                                    Read the rest
                                </UnstyledButton>
                            )}
                    </Stack>
                </Stack>
            </Group>
        </Card>
    )
}
