import { ProductEntity } from '@/types/entities/product.entity'
import { Box, Group, Image } from '@mantine/core'
import { FiTrash2 } from 'react-icons/fi'
import { ImageActionButton } from '../../images/ImageActionButton'

export const CurrentImage = ({
    currentImage,
    deleteImage,
    canDelete,
}: {
    currentImage: ProductEntity['images'][number]
    deleteImage: (id: number) => void
    canDelete: boolean
}) => {
    return (
        <Box
            sx={(theme) => ({
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: 150,
                borderRadius: theme.radius.md,
            })}
        >
            <Image
                src={currentImage.url} // need the height set everywhere otherwise image won't fill the height of the Box
                height="100%"
                styles={{
                    root: { height: '100%', pointerEvents: 'none' },
                    figure: { height: '100%' },
                    imageWrapper: { height: '100%' },
                }}
                alt="Product image"
            />

            <Group
                noWrap
                spacing={5}
                grow
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                }}
            >
                {/* delete image button */}
                {canDelete && (
                    <ImageActionButton
                        tooltiplabel="Delete image"
                        color="red"
                        onClick={() => deleteImage(currentImage.id)}
                    >
                        <FiTrash2 size={15} />
                    </ImageActionButton>
                )}
            </Group>
        </Box>
    )
}
