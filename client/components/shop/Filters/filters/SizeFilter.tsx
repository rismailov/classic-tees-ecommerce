import { Checkbox } from '@mantine/core'
import useFiltersStore from '@/lib/store/filters.store'
import useFilterOptionsStore from '@/lib/store/filter-options.store'
import { FilterLayout } from '../layouts/FilterLayout'

export const SizeFilter = ({ value }: { value: string }) => {
    const sizes = useFiltersStore((state) => state.sizes)
    const setSizes = useFiltersStore((state) => state.setSizes)

    const options = useFilterOptionsStore((state) => state.options)

    return (
        <FilterLayout value={value} title="Size">
            <Checkbox.Group
                value={sizes}
                onChange={setSizes}
                orientation="vertical"
                spacing="xs"
                sx={{
                    '.mantine-Stack-root': {
                        paddingTop: 0,
                    },
                }}
            >
                {options.sizes.map(({ value, label }) => (
                    <Checkbox
                        key={value}
                        size="xs"
                        label={label.toUpperCase()}
                        value={value}
                    />
                ))}
            </Checkbox.Group>
        </FilterLayout>
    )
}
