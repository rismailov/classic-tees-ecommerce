import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { removeColour, getColours } from '@/lib/api/admin/colours'
import { ActionIcon, Card, Table, Text } from '@mantine/core'
import { ReactElement } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CreateColour } from '@/components/admin/colours/Create'
import { REACT_QUERY_COLOURS_KEY } from '@/lib/constants'
import { FiTrash } from 'react-icons/fi'

export default function ColoursIndex() {
    const queryClient = useQueryClient()

    const { data: colours, isLoading: isColoursLoading } = useQuery(
        REACT_QUERY_COLOURS_KEY,
        getColours,
    )
    const { mutateAsync: deleteColour } = useMutation(removeColour, {
        onSuccess: () => {
            queryClient.invalidateQueries(REACT_QUERY_COLOURS_KEY)
        },
    })

    if (isColoursLoading) {
        // too quick for loader
        return <></>
    }

    if (!colours) {
        return <Text color="red">Something went wrong fetching colours...</Text>
    }

    if (!colours.length) {
        return <Text color="dimmed">There are no records yet...</Text>
    }

    return (
        <Card sx={{ maxWidth: 600 }}>
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
        </Card>
    )
}

ColoursIndex.getLayout = (page: ReactElement) => (
    <PageLayout breadcrumbs={['Colours']}>
        {page}

        <CreateColour />
    </PageLayout>
)
