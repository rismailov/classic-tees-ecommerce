import { DarkButton } from '@/components/shop/styled/DarkButton'
import { SIZE_LABELS } from '@/lib/constants'
import useCartStore from '@/lib/store/cart.store'
import useUiStore from '@/lib/store/ui.store'
import { ProductEntity } from '@/types/entities/product.entity'
import {
    ActionIcon,
    ColorSwatch,
    Group,
    Stack,
    Text,
    Tooltip,
    UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useStyles } from './AddProductToCartForm.styles'

type AddProductToCartDto = {
    size: { id: string; name: string }
    colour: { id: string; name: string }
}

export const AddProductToCartForm = ({
    product,
}: {
    product: ProductEntity
}) => {
    const { classes, cx } = useStyles()

    const items = useCartStore((state) => state.items)
    const addItem = useCartStore((state) => state.addItem)

    const toggleCart = useUiStore((state) => state.toggleCart)

    const form = useForm<AddProductToCartDto>({
        initialValues: {
            size: product.sizes[0],
            colour: { id: product.colour.value, name: product.colour.label },
        },
    })

    const onSubmit = ({ size, colour }: AddProductToCartDto) => {
        const id = `${product.id}-${size.id}`
        const thisItem = items.find((item) => item.id === id)

        addItem({
            id,
            imageUrl: product.images[0].url,
            name: product.name,
            size,
            colour,
            price: product.price,
            amount: thisItem ? thisItem.amount + 1 : 1,
        })

        toggleCart()
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing="xl">
                {/* choose size */}
                {form.values.size && (
                    <Stack spacing={5}>
                        <Text weight={500}>
                            Size: {SIZE_LABELS[form.values.size.name]}
                        </Text>

                        <Group spacing={5}>
                            {product.sizes.map((size) => (
                                <ActionIcon
                                    key={size.id}
                                    onClick={() =>
                                        form.setFieldValue('size', size)
                                    }
                                    size="lg"
                                    radius="xl"
                                    variant="outline"
                                    className={cx([
                                        classes.size,
                                        size.id === form.values.size.id &&
                                            classes.selectedSize,
                                    ])}
                                >
                                    {size.name.toUpperCase()}
                                </ActionIcon>
                            ))}
                        </Group>
                    </Stack>
                )}

                {/* choose colour */}
                <Stack spacing={5}>
                    <Text weight={500}>Colour: {product.colour.label}</Text>

                    <Group>
                        {product.colours.map(({ value, label, hex }) => (
                            <Tooltip
                                withArrow
                                key={value}
                                label={label}
                                position="bottom"
                            >
                                <UnstyledButton>
                                    <ColorSwatch color={hex} />
                                </UnstyledButton>
                            </Tooltip>
                        ))}
                    </Group>
                </Stack>

                {/* add to cart */}
                <DarkButton type="submit" mt="sm" w="50%">
                    Add to cart
                </DarkButton>
            </Stack>
        </form>
    )
}
