import { UserProductShowEntity } from '@/types/entities/product.entity'
import {
    ActionIcon,
    Box,
    Group,
    Image,
    Stack,
    UnstyledButton,
} from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper/types'
import { useStyles } from './ProductImages.styles'

export const ProductImages = ({
    product,
}: {
    product: UserProductShowEntity
}) => {
    const { classes } = useStyles()

    const mainSwiperRef = useRef<SwiperCore>()
    const thumbsSwiperRef = useRef<SwiperCore>()

    // Track current slide index to highlight active thumbs and disable custom nav buttons
    const [mainActiveIndex, setMainActiveIndex] = useState(0)

    // Track whether or not thumbs slider has reached the edge to disable custom nav buttons
    const [{ isBeginning, isEnd }, setNavigationState] = useState({
        isBeginning: true,
        isEnd: true,
    })

    const [mainSwiperParams, setMainSwiperParams] = useState<SwiperProps>({
        modules: [Thumbs],
        thumbs: {
            swiper: thumbsSwiperRef.current,
        },
        onInit: (swiper) => (mainSwiperRef.current = swiper),
        onActiveIndexChange: (swiper) => {
            setMainActiveIndex(swiper.activeIndex)
        },
    })

    // @note this useEffect is needed because the main slider
    // gets initialised BEFORE the thumbs slider.
    // in other words: thumbsSwiperRef.current is still null when mainSwiperParams
    // got initialised
    useEffect(() => {
        if (thumbsSwiperRef.current) {
            setMainSwiperParams((prev) => ({
                ...prev,
                thumbs: {
                    swiper: thumbsSwiperRef.current,
                },
            }))
        }
    }, [thumbsSwiperRef])

    const thumbsSwiperParams: SwiperProps = {
        modules: [Thumbs, Navigation],
        allowTouchMove: false,
        navigation: true,
        watchSlidesProgress: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
        slideToClickedSlide: true,
        onInit: (swiper) => {
            thumbsSwiperRef.current = swiper

            setNavigationState({
                isBeginning: swiper.isBeginning,
                isEnd: swiper.isEnd,
            })
        },
        onSlideChange: ({ isBeginning, isEnd }) =>
            setNavigationState({ isBeginning, isEnd }),
        style: { width: '100%' },
    }

    return (
        <Stack w="40%" align="stretch" spacing="xs">
            {/* MAIN SLIDER */}
            <Box sx={{ position: 'relative', width: '100%', height: 525 }}>
                <ActionIcon
                    variant="filled"
                    size="xl"
                    className={`${classes.mainSliderNavButton} ${classes.mainSliderNavButtonLeft}`}
                    onClick={() => mainSwiperRef.current?.slidePrev()}
                    disabled={mainActiveIndex === 0}
                >
                    <IconChevronLeft />
                </ActionIcon>

                <Swiper {...mainSwiperParams}>
                    {product.images.map((img, idx) => (
                        <SwiperSlide key={`slide_${idx}`}>
                            <Image
                                width="100%"
                                height={525}
                                radius="md"
                                src={img.url}
                                alt={product.name}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <ActionIcon
                    variant="filled"
                    size="xl"
                    className={`${classes.mainSliderNavButton} ${classes.mainSliderNavButtonRight}`}
                    onClick={() => mainSwiperRef.current?.slideNext()}
                    disabled={mainActiveIndex === product.images.length - 1}
                >
                    <IconChevronRight />
                </ActionIcon>
            </Box>

            {/* THUMBS SLIDER */}
            <Group
                noWrap
                spacing="xs"
                w="100%"
                align="stretch"
                sx={{ height: 100 }}
            >
                <ActionIcon
                    onClick={() => thumbsSwiperRef.current?.slidePrev()}
                    variant="subtle"
                    className={classes.secondSliderNavButton}
                    disabled={isBeginning}
                >
                    <IconChevronLeft />
                </ActionIcon>

                <Swiper {...thumbsSwiperParams}>
                    {product.images.map((img, idx) => (
                        <SwiperSlide key={img.id}>
                            <UnstyledButton
                                className={classes.thumb}
                                sx={(theme) => ({
                                    border: `1.5px solid ${
                                        mainActiveIndex === idx
                                            ? theme.fn.themeColor('yellow')
                                            : 'transparent'
                                    }`,
                                })}
                            >
                                <Image
                                    height="100%"
                                    src={img.url}
                                    alt={product.name}
                                    styles={{
                                        root: {
                                            height: '100%',
                                            pointerEvents: 'none',
                                        },
                                        figure: { height: '100%' },
                                        imageWrapper: { height: '100%' },
                                    }}
                                />
                            </UnstyledButton>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <ActionIcon
                    onClick={() => thumbsSwiperRef.current?.slideNext()}
                    variant="light"
                    className={classes.secondSliderNavButton}
                    disabled={isEnd}
                >
                    <IconChevronRight />
                </ActionIcon>
            </Group>
        </Stack>
    )
}
