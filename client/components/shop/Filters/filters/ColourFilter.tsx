import useFilterOptionsStore from '@/lib/store/filter-options.store'
import useFiltersStore from '@/lib/store/filters.store'
import { ColorSwatch, Group, Checkbox } from '@mantine/core'
import { FilterLayout } from '../layouts/FilterLayout'

export const ColourFilter = ({ value }: { value: string }) => {
    const colours = useFiltersStore((state) => state.colours)
    const setColours = useFiltersStore((state) => state.setColours)

    const options = useFilterOptionsStore((state) => state.options)

    return (
        <FilterLayout value={value} title="Colour">
            <Checkbox.Group
                value={colours}
                onChange={setColours}
                orientation="vertical"
                spacing="xs"
                sx={{
                    '.mantine-Stack-root': {
                        paddingTop: 0,
                    },
                }}
            >
                {options.colours.map(({ value, label, hex }) => (
                    <Checkbox
                        key={value}
                        size="xs"
                        w="100%"
                        styles={{
                            body: {
                                width: '100%',
                            },
                            labelWrapper: {
                                width: '100%',
                            },
                        }}
                        label={
                            <Group spacing={8}>
                                <ColorSwatch size={17} color={hex} />

                                {label}
                            </Group>
                        }
                        value={value}
                    />
                ))}
            </Checkbox.Group>
        </FilterLayout>
    )
}
