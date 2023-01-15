import { getPropertyOptions } from '@/lib/api/admin/products'
import {
    Checkbox,
    NumberInput,
    Select,
    TextInput,
    Text,
    Group,
    ColorSwatch,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { forwardRef } from 'react'
import { FiDollarSign } from 'react-icons/fi'
import { useQuery } from 'react-query'

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
    form: UseFormReturnType<any>
}) => {
    const { data: options, isLoading: isOptionsLoading } = useQuery(
        'property-options',
        getPropertyOptions,
    )

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
                icon={<FiDollarSign size={15} />}
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
        </>
    )
}
