import { Group, Text } from '@mantine/core'

export const Reviews = ({
    reviewsCount,
    starsCount,
}: {
    reviewsCount: number
    starsCount: number
}) => {
    return (
        <Group spacing={5}>
            <Group
                spacing={1}
                sx={(theme) => ({
                    svg: {
                        width: 15,
                        height: 15,
                        opacity: 0.3,

                        '&.fill': {
                            fill: theme.fn.themeColor('yellow'),
                            stroke: theme.fn.themeColor('yellow'),
                            opacity: 1,
                        },
                    },
                })}
            >
                {[...Array(5)].map((_n, i) => (
                    <svg
                        key={i}
                        className={`${i + 1 <= starsCount ? 'fill' : ''}`}
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

            <Text size="xs" mt={3} weight={600}>
                {reviewsCount} {`${reviewsCount === 1 ? 'Review' : 'Reviews'}`}
            </Text>
        </Group>
    )
}
