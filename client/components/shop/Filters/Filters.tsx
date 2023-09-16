import { Accordion, Divider, Stack, Title } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useStyles } from './Filters.styles'
import { CategoryFilter } from './filters/CategoryFilter'
import { ColourFilter } from './filters/ColourFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'

export const FILTERS = {
    CATEGORY: 'category',
    PRICE: 'price',
    SIZE: 'size',
    COLOUR: 'colour',
}

export const Filters = () => {
    const { classes } = useStyles()

    return (
        <Stack
            w="25%"
            spacing="xs"
            sx={{
                position: 'sticky',
                height: 'calc(100vh - 120px)',
                overflowY: 'auto',
                top: 90,
                paddingRight: 10,
            }}
        >
            <Title order={2}>Filters</Title>

            <Accordion
                defaultValue={Object.values(FILTERS)}
                multiple
                variant="separated"
                chevron={<IconChevronDown size={18} strokeWidth={1.85} />}
                classNames={{
                    item: classes.item,
                    content: classes.content,
                    control: classes.control,
                    chevron: classes.chevron,
                }}
            >
                <CategoryFilter value={FILTERS.CATEGORY} />
                <Divider />
                <PriceFilter value={FILTERS.PRICE} />
                <Divider />
                <SizeFilter value={FILTERS.SIZE} />
                <Divider />
                <ColourFilter value={FILTERS.COLOUR} />
            </Accordion>
        </Stack>
    )
}
