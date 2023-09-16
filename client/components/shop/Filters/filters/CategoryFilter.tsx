import { CATEGORIES } from '@/lib/constants'
import useFiltersStore from '@/lib/store/filters.store'
import { Checkbox } from '@mantine/core'
import React from 'react'
import { FilterLayout } from '../layouts/FilterLayout'

export const CategoryFilter = ({ value }: { value: string }) => {
    const categories = useFiltersStore((state) => state.categories)
    const setCategories = useFiltersStore((state) => state.setCategories)

    return (
        <FilterLayout value={value} title="Category">
            <Checkbox.Group
                value={categories}
                onChange={setCategories}
                orientation="vertical"
                spacing="xs"
                sx={{
                    '.mantine-Stack-root': {
                        paddingTop: 0,
                    },
                }}
            >
                {CATEGORIES.map((category) => (
                    <Checkbox
                        key={category.value}
                        label={category.label}
                        value={category.value}
                    />
                ))}
            </Checkbox.Group>
        </FilterLayout>
    )
}
