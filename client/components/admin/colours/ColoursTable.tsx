import { TJsonResponse } from '@/types/api/json-response.type'
import { ColourEntity } from '@/types/entities/colour.entity'
import { Group, Table, UnstyledButton } from '@mantine/core'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { IconTrash } from '@tabler/icons-react'

export const ColoursTable = ({
    colours,
    deleteColour,
}: {
    colours: ColourEntity[]
    deleteColour: UseMutateAsyncFunction<
        TJsonResponse,
        unknown,
        number,
        unknown
    >
}) => {
    return (
        <Table verticalSpacing="xs">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Colour</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {colours.map((c) => (
                    <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.value}</td>
                        <td>
                            <UnstyledButton
                                onClick={() => deleteColour(c.id)}
                                fz="sm"
                                fw={500}
                                sx={(theme) => ({
                                    color: theme.fn.themeColor('red'),
                                    ':hover': {
                                        color: theme.colors.dark[5],
                                    },
                                })}
                            >
                                <Group spacing={5}>
                                    Remove
                                    <IconTrash size={16} />
                                </Group>
                            </UnstyledButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
