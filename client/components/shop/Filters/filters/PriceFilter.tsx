import useFiltersStore from '@/lib/store/filters.store'
import { Checkbox, Group, NumberInput, Stack } from '@mantine/core'
import { IconCurrencyDollar, IconMinus } from '@tabler/icons-react'
import { FilterLayout } from '../layouts/FilterLayout'

export const PriceFilter = ({ value }: { value: string }) => {
    const price = useFiltersStore((state) => state.price)
    const setPrice = useFiltersStore((state) => state.setPrice)

    return (
        <FilterLayout value={value} title="Price">
            <Stack spacing="xs">
                <Checkbox
                    checked={price.onSale}
                    onChange={(event) =>
                        setPrice({
                            ...price,
                            onSale: event.currentTarget.checked,
                        })
                    }
                    label="On sale"
                />

                {/* Price range */}
                <Group noWrap spacing="xs" mx={2}>
                    {/* TODO: change icon based on user's location */}
                    <NumberInput
                        value={price.min === null ? undefined : price.min}
                        onChange={(v) =>
                            setPrice({
                                ...price,
                                min: typeof v === 'number' ? v : null,
                            })
                        }
                        min={0.0}
                        precision={2}
                        placeholder="min"
                        icon={<IconCurrencyDollar size={14} />}
                        styles={{
                            input: {
                                paddingLeft: '30px !important',
                            },
                        }}
                    />

                    <IconMinus style={{ opacity: 0.5 }} />

                    {/* TODO: change icon based on user's location */}
                    <NumberInput
                        value={price.max === null ? undefined : price.max}
                        onChange={(v) =>
                            setPrice({
                                ...price,
                                max: typeof v === 'number' ? v : null,
                            })
                        }
                        precision={2}
                        placeholder="max"
                        icon={<IconCurrencyDollar size={14} />}
                        styles={{
                            input: {
                                paddingLeft: '30px !important',
                            },
                        }}
                    />
                </Group>
            </Stack>
        </FilterLayout>
    )
}
