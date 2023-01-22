import { TJsonResponse } from '@/types/api/json-response.type'
import { ColourEntity } from '@/types/entities/colour.entity'
import { ActionIcon, Table } from '@mantine/core'
import { FiTrash } from '@react-icons/all-files/fi/FiTrash'
import { UseMutateAsyncFunction } from 'react-query'

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
        <Table verticalSpacing={5}>
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
                            <ActionIcon
                                onClick={() => deleteColour(c.id)}
                                color="red"
                                size="md"
                            >
                                <FiTrash size={16} />
                            </ActionIcon>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
