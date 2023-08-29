import { UserProductIndexEntity } from '@/types/entities/product.entity'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'

export const SelectSizeActionIcon = ({
    isLoading,
    isSelected,
    onAddItem,
    size,
    classes,
}: {
    isLoading: boolean
    isSelected: boolean
    size: UserProductIndexEntity['sizes'][number]
    onAddItem: () => void
    classes: ActionIconProps['className']
}) => {
    return (
        <ActionIcon
            onClick={onAddItem}
            loading={isLoading && isSelected}
            size="lg"
            radius="xl"
            variant="outline"
            className={classes}
            sx={(theme) => ({
                ...(isSelected &&
                    !isLoading && {
                        background: theme.fn.rgba(
                            theme.fn.themeColor('orange'),
                            0.1,
                        ),
                        ':hover': {
                            background: theme.fn.rgba(
                                theme.fn.themeColor('orange'),
                                0.1,
                            ),
                        },
                        borderColor: theme.fn.themeColor('orange'),
                        svg: {
                            color: theme.fn.themeColor('orange'),
                        },
                    }),
            })}
        >
            {isSelected ? <IconCheck size={18} /> : size.label.toUpperCase()}
        </ActionIcon>
    )
}
