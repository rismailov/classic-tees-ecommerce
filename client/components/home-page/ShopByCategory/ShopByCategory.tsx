import { Container, Group, Stack, Title } from '@mantine/core'
import { Activewear, Crew, Polo, VNeck } from './category-icons'
import { CategoryItem } from './CategoryItem'

export const ShopByCategory = () => {
    return (
        <Container mt={70} py="lg">
            <Stack align="center" justify="center" spacing={50}>
                <Title>Shop by category</Title>

                <Group spacing={75}>
                    <CategoryItem categoryIcon={<Crew />} title="Crew" />

                    <CategoryItem
                        categoryIcon={<Activewear />}
                        title="Activewear"
                    />

                    <CategoryItem categoryIcon={<Polo />} title="Polo" />

                    <CategoryItem categoryIcon={<VNeck />} title="V-Neck" />
                </Group>
            </Stack>
        </Container>
    )
}
