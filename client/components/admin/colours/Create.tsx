import { storeColour } from '@/lib/api/admin/colours'
import {
    ActionIcon,
    Button,
    Group,
    Stack,
    TextInput,
    Text,
    Card,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from 'react-query'
import { randomId } from '@mantine/hooks'
import { FiCheckCircle, FiPlusCircle, FiTrash } from 'react-icons/fi'
import { StoreColourDto } from '@/types/api/dto/colours/store-colour.dto'
import { REACT_QUERY_COLOURS_KEY } from '@/lib/constants'

export const CreateColour = () => {
    const queryClient = useQueryClient()
    const form = useForm<StoreColourDto>({
        initialValues: {
            colours: [],
        },
    })

    const { mutateAsync, isLoading } = useMutation(storeColour, {
        meta: { form },
    })

    const onSubmit = (values: StoreColourDto) => {
        mutateAsync(values).then(() => {
            form.reset()

            queryClient.invalidateQueries(REACT_QUERY_COLOURS_KEY)
        })
    }

    const fields = form.values.colours.map((item, index) => (
        <Group key={item.key} mt="xs" spacing="xs">
            <TextInput
                placeholder="navy"
                withAsterisk
                sx={{ flex: 1 }}
                {...form.getInputProps(`colours.${index}.value`)}
            />

            <ActionIcon
                color="red"
                variant="light"
                onClick={() => form.removeListItem('colours', index)}
            >
                <FiTrash size={15} />
            </ActionIcon>
        </Group>
    ))

    return (
        <Stack mt="xl" spacing="xs">
            <Title order={3}>Add colour</Title>

            <form onSubmit={form.onSubmit(onSubmit)}>
                <Card p="lg" sx={{ maxWidth: 400 }}>
                    <Stack spacing={0}>
                        {!!fields.length && (
                            <Stack spacing={0}>
                                <Text weight={500} size="sm">
                                    Colour name
                                </Text>

                                <Text color="dimmed" size="xs">
                                    Casing doesn't matter
                                </Text>
                            </Stack>
                        )}

                        {fields}

                        <Group
                            grow
                            noWrap
                            spacing="xs"
                            mt={fields.length ? 'md' : 0}
                        >
                            <Button
                                variant="light"
                                onClick={() =>
                                    form.insertListItem('colours', {
                                        value: '',
                                        key: randomId(),
                                    })
                                }
                                leftIcon={<FiPlusCircle size={15} />}
                            >
                                Add colour
                            </Button>
                        </Group>
                    </Stack>

                    <Button
                        type="submit"
                        disabled={
                            isLoading ||
                            form.values.colours
                                .map((c) => c.value)
                                .some((v) => !v)
                        }
                        mt="md"
                        color="teal"
                        sx={{ alignSelf: 'start' }}
                        leftIcon={<FiCheckCircle size={15} />}
                        loading={isLoading}
                    >
                        Save
                    </Button>
                </Card>
            </form>
        </Stack>
    )
}
