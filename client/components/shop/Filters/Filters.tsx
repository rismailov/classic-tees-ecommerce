import { Divider, Accordion, Stack, Title } from '@mantine/core'
import { useStyles } from './Filters.styles'
import { CategoryFilter } from './filters/CategoryFilter'
import { ColourFilter } from './filters/ColourFilter'
import { PriceFilter } from './filters/PriceFilter'
import { SizeFilter } from './filters/SizeFilter'
import { IconChevronDown } from '@tabler/icons-react'

export const Filters = () => {
    const { classes } = useStyles()

    return (
        <Stack
            w="25%"
            spacing="xs"
            sx={{
                position: 'sticky',
                height: 'calc(100vh - 60px)',
                overflowY: 'auto',
                top: 60,
                paddingRight: 10,
            }}
        >
            <Title order={2}>Filters</Title>

            <Accordion
                defaultValue={['price', 'category']}
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
                <CategoryFilter />
                <Divider />
                <PriceFilter />
                <Divider />
                <SizeFilter />
                <Divider />
                <ColourFilter />
            </Accordion>
        </Stack>
    )
}
