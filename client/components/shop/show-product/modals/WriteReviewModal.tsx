import { storeReview } from '@/lib/api/reviews'
import { REACT_QUERY_PRODUCTS_KEY } from '@/lib/constants'
import { StoreReviewDto } from '@/types/api/dto/reviews/store-review.dto'
import {
    Button,
    Group,
    Modal,
    Stack,
    Textarea,
    TextInput,
    UnstyledButton,
    Text,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IconStar } from '@tabler/icons-react'

const ReviewStar = ({
    setStars,
    isHovered,
    onMouseEnter,
    onMouseLeave,
}: {
    setStars: () => void
    isHovered: boolean
    onMouseLeave: () => void
    onMouseEnter: () => void
}) => {
    return (
        <UnstyledButton
            px={3}
            onClick={setStars}
            data-hovered={isHovered}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <IconStar />
        </UnstyledButton>
    )
}

const INITIAL_STARS_COUNT = 0

export const WriteReviewModal = ({
    opened,
    onClose,
    productID,
    productNanoid,
}: {
    opened: boolean
    onClose: () => void
    productID: number
    productNanoid: string
}) => {
    const queryClient = useQueryClient()
    const form = useForm<StoreReviewDto>({
        initialValues: {
            title: '',
            text: '',
            credentials: '',
            stars: INITIAL_STARS_COUNT,
        },
    })

    const [hoveredStarsCount, setHoveredStarsCount] =
        useState(INITIAL_STARS_COUNT)

    const { mutateAsync } = useMutation(storeReview, { meta: { form } })

    const onSubmit = (values: StoreReviewDto) => {
        mutateAsync({ productID, reviewData: values }).then(() => {
            form.reset()

            queryClient.invalidateQueries({
                queryKey: [REACT_QUERY_PRODUCTS_KEY, { nanoid: productNanoid }],
            })

            onClose()
        })
    }

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Write a review"
            padding={30}
        >
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack>
                    <TextInput
                        data-autofocus
                        required
                        placeholder="Your name"
                        {...form.getInputProps('credentials')}
                    />

                    <TextInput
                        required
                        placeholder="Review title"
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        required
                        placeholder="Review text"
                        minRows={10}
                        {...form.getInputProps('text')}
                    />

                    <Stack spacing="xs">
                        <Group
                            w="100%"
                            mt={5}
                            spacing={0}
                            position="center"
                            sx={(theme) => ({
                                alignSelf: 'start',

                                svg: {
                                    color: theme.colors.gray[4],
                                    width: 25,
                                    height: 25,
                                },

                                'button[data-hovered="true"]': {
                                    svg: {
                                        fill: theme.colors.yellow[7],
                                        color: theme.colors.yellow[7],
                                    },
                                },
                            })}
                        >
                            {[1, 2, 3, 4, 5].map((number) => (
                                <ReviewStar
                                    key={number}
                                    isHovered={
                                        number <= form.values.stars ||
                                        number <= hoveredStarsCount
                                    }
                                    onMouseEnter={() =>
                                        setHoveredStarsCount(number)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredStarsCount(
                                            INITIAL_STARS_COUNT,
                                        )
                                    }
                                    setStars={() =>
                                        form.setFieldValue('stars', number)
                                    }
                                />
                            ))}
                        </Group>

                        {form.errors.stars && (
                            <Text color="red" align="center" size="sm">
                                Please rate this product with stars.
                            </Text>
                        )}
                    </Stack>

                    <Button
                        type="submit"
                        mt="xs"
                        h={45}
                        size="md"
                        color="dark"
                        fz={15}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}
