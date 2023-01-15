import { ActionIcon, Box, Group, Image } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'
import { FiStar, FiTrash } from 'react-icons/fi'
import { ImageActionButton } from '../../images/ImageActionButton'

export const ImagePreview = ({
    file,
    index,
    removeImage,
    isMain,
    makeMain,
}: {
    file: FileWithPath
    index: number
    removeImage: (index: number) => void
    isMain?: boolean
    makeMain?: (index: number) => void
}) => {
    const imageUrl = URL.createObjectURL(file)

    return (
        <Box
            key={index}
            sx={(theme) => ({
                height: 200,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: theme.radius.md,
                border: `2px solid ${
                    isMain ? theme.fn.themeColor('yellow') : 'transparent'
                }`,
            })}
        >
            <Image
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                // need the height set everywhere otherwise image won't fill the height of the Box
                height="100%"
                styles={{
                    root: { height: '100%' },
                    figure: { height: '100%' },
                    imageWrapper: { height: '100%' },
                }}
            />

            <Group spacing={5} sx={{ position: 'absolute', left: 5, top: 5 }}>
                <ImageActionButton
                    color="red"
                    tooltiplabel="Remove image"
                    onClick={() => removeImage(index)}
                >
                    <FiTrash size={15} />
                </ImageActionButton>

                {typeof isMain !== 'undefined' &&
                    typeof makeMain !== 'undefined' &&
                    !isMain && (
                        <ImageActionButton
                            color="yellow"
                            tooltiplabel="Set as main"
                            variant="light"
                            onClick={() => makeMain(index)}
                        >
                            <FiStar size={15} />
                        </ImageActionButton>
                    )}
            </Group>
        </Box>
    )
}
