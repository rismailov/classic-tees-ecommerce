import { storeColour } from '@/lib/api/admin/colours'
import {
    ActionIcon,
    Button,
    Group,
    Stack,
    TextInput,
    Text,
    ColorInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { randomId } from '@mantine/hooks'
import { FiTrash } from '@react-icons/all-files/fi/FiTrash'
import { FiPlus } from '@react-icons/all-files/fi/FiPlus'
import { StoreColourDto } from '@/types/api/dto/colours/store-colour.dto'
import { REACT_QUERY_COLOURS_KEY } from '@/lib/constants'

export const CreateColourForm = () => {
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

            queryClient.invalidateQueries({
                queryKey: [REACT_QUERY_COLOURS_KEY],
            })
        })
    }

    const fields = form.values.colours.map((item, index) => (
        <Group key={item.key} mt="xs" position="apart">
            <TextInput
                w="100%"
                placeholder="Navy Blue"
                withAsterisk
                autoComplete="off"
                sx={{ flex: 1 }}
                {...form.getInputProps(`colours.${index}.value`)}
            />

            <Group w="58%" noWrap>
                <ColorInput
                    placeholder="Pick colour"
                    autoComplete="off"
                    {...form.getInputProps(`colours.${index}.hexCode`)}
                />

                <ActionIcon
                    color="red"
                    onClick={() => form.removeListItem('colours', index)}
                >
                    <FiTrash size={15} />
                </ActionIcon>
            </Group>
        </Group>
    ))

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack spacing={0}>
                {!!fields.length && (
                    <Group noWrap align="start">
                        <Stack w="40%" spacing={0}>
                            <Text weight={500} size="sm">
                                Colour name
                            </Text>

                            <Text color="dimmed" size="xs">
                                Casing doesn't matter
                            </Text>
                        </Stack>

                        <Stack w="60%" spacing={0}>
                            <Text weight={500} size="sm">
                                Colour hex code
                            </Text>

                            <Text color="dimmed" size="xs">
                                Pick hex code
                            </Text>
                        </Stack>
                    </Group>
                )}

                {fields}

                <Group grow noWrap spacing="xs" mt={fields.length ? 'md' : 0}>
                    <Button
                        color="teal"
                        variant="light"
                        onClick={() =>
                            form.insertListItem('colours', {
                                value: '',
                                key: randomId(),
                            })
                        }
                        rightIcon={<FiPlus size={15} />}
                    >
                        Add colour
                    </Button>
                </Group>
            </Stack>

            <Button
                type="submit"
                disabled={
                    isLoading ||
                    !form.values.colours.length ||
                    form.values.colours.map((c) => c.value).some((v) => !v)
                }
                mt="md"
                color="teal"
                sx={{ alignSelf: 'start' }}
                loading={isLoading}
            >
                Save
            </Button>
        </form>
    )
}
