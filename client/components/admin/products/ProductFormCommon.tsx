import { getPropertyOptions } from '@/lib/api/admin/products'
import {
    Checkbox,
    ColorSwatch,
    Group,
    Input,
    NumberInput,
    Select,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconCurrencyDollar, IconPercentage } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { forwardRef, useEffect, useRef } from 'react'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string
    label: string
    hex: string
}

const ColourSelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, hex, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap spacing="xs">
                <ColorSwatch color={hex} size={17} />

                <Text size="sm">{label}</Text>
            </Group>
        </div>
    ),
)

export const ProductFormCommon = ({
    form,
}: {
    // TODO: fix types
    form: UseFormReturnType<any>
}) => {
    // focus on input when discount enabled
    const { isDiscounted } = form.values
    const discountPercentInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isDiscounted && discountPercentInputRef.current) {
            discountPercentInputRef.current.focus()
        }
    }, [isDiscounted, discountPercentInputRef])

    const { data: options, isLoading: isOptionsLoading } = useQuery({
        queryKey: ['property-options'],
        queryFn: getPropertyOptions,
    })

    if (isOptionsLoading) {
        return <></>
    }

    if (!isOptionsLoading && !options) {
        return <Text>Unhandled error occured</Text>
    }

    return (
        <>
            {/* name */}
            <TextInput
                autoFocus
                required
                label="Name"
                placeholder="Product name"
                {...form.getInputProps('name')}
            />

            {/* price */}
            <NumberInput
                required
                label="Price"
                placeholder="Product price"
                icon={<IconCurrencyDollar size={15} />}
                {...form.getInputProps('price')}
            />

            {/* category */}
            <Select
                required
                label="Category"
                placeholder="Select product category"
                data={options.categories}
                {...form.getInputProps('category')}
            />

            {/* colour */}
            <Select
                required
                label="Colour"
                data={options.colours}
                itemComponent={ColourSelectItem}
                {...form.getInputProps('colour')}
            />

            {/* sizes */}
            <Checkbox.Group
                defaultValue={[]}
                label="Sizes"
                description="Available sizes"
                withAsterisk
                orientation="vertical"
                spacing={0}
                {...form.getInputProps('sizes')}
            >
                {options.sizes.map(({ id, value }) => (
                    <Checkbox key={id} value={id} label={value} />
                ))}
            </Checkbox.Group>

            {/* discount */}
            <Stack spacing={5}>
                <Input.Label>Discount</Input.Label>

                <Checkbox
                    label="Discounted"
                    {...form.getInputProps('isDiscounted', {
                        type: 'checkbox',
                    })}
                />

                {form.values.isDiscounted && (
                    <NumberInput
                        ref={discountPercentInputRef}
                        min={5}
                        max={50}
                        precision={0}
                        placeholder={5}
                        icon={<IconPercentage />}
                        {...form.getInputProps('discountPercent')}
                    />
                )}
            </Stack>
        </>
    )
}
