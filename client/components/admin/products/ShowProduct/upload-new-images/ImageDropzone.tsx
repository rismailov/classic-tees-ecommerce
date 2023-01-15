import { SimpleGrid, Stack, Text } from '@mantine/core'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { ReactNode } from 'react'
import { ImagePreview } from '../../show/product-images/ImagePreview'

export const ImageDropzone = ({
    onDrop,
    removeImagePreview,
    images,
    errors,
    mainImageIndex,
    makeMain,
}: {
    onDrop: (files: FileWithPath[]) => void
    removeImagePreview: (index: number) => void
    images: FileWithPath[]
    errors: ReactNode
    mainImageIndex?: number
    makeMain?: (index: number) => void
}) => {
    /* Image previews with ability to make image main */
    const previews = images.map((file, index) => {
        return (
            <ImagePreview
                key={index}
                file={file}
                index={index}
                removeImage={removeImagePreview}
                isMain={mainImageIndex === index}
                makeMain={makeMain}
            />
        )
    })

    return (
        <Stack spacing={0}>
            <Dropzone radius="md" accept={IMAGE_MIME_TYPE} onDrop={onDrop}>
                <Text size="sm" align="center" color="dimmed">
                    Drop images here
                </Text>
            </Dropzone>

            {errors && (
                <Text mt="xs" size="sm" color="red">
                    {errors}
                </Text>
            )}

            <SimpleGrid
                cols={3}
                breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                mt={previews.length > 0 ? 'xl' : 0}
            >
                {previews}
            </SimpleGrid>
        </Stack>
    )
}
