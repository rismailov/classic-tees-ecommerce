import { Container, Group, Stack, Title } from '@mantine/core'
import { CategoryItem } from './CategoryItem'
import { Activewear, Tall, Polo, VNeck } from './category-icons'

export const ShopByCategory = () => {
    return (
        <Container pt={80} pb={60}>
            <Stack align="center" justify="center" spacing={50}>
                <Title lh={1}>Shop by category</Title>

                <Group spacing={75}>
                    <CategoryItem
                        categoryValue="tall"
                        categoryIcon={<Tall />}
                        title="Tall"
                    />

                    <CategoryItem
                        categoryValue="activewear"
                        categoryIcon={<Activewear />}
                        title="Activewear"
                    />

                    <CategoryItem
                        categoryValue="polo"
                        categoryIcon={<Polo />}
                        title="Polo"
                    />

                    <CategoryItem
                        categoryValue="v-neck"
                        categoryIcon={<VNeck />}
                        title="V-Neck"
                    />
                </Group>
            </Stack>
        </Container>
    )
}
