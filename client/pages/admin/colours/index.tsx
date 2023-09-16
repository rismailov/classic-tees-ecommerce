import { ColoursTable } from '@/components/admin/colours/ColoursTable'
import { CreateColourForm } from '@/components/admin/colours/CreateColourForm'
import { SectionLayout } from '@/components/admin/SectionLayout'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { useToast } from '@/hooks/use-toast'
import { getColours, removeColour } from '@/lib/api/admin/colours'
import { REACT_QUERY_COLOURS_KEY } from '@/lib/constants'
import { Center, Container, Group, Pagination, Text } from '@mantine/core'
import axios from 'axios'
import { ReactElement, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function ColoursIndex() {
    const queryClient = useQueryClient()
    const { showError } = useToast()

    // pagination
    const [page, setPage] = useState(1)

    const { data: colours, isLoading: isColoursLoading } = useQuery({
        queryKey: [REACT_QUERY_COLOURS_KEY, { page }],
        queryFn: () => getColours({ page }),
    })

    const { mutateAsync: deleteColour } = useMutation(removeColour, {
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [REACT_QUERY_COLOURS_KEY],
            })
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                showError(error.response?.data.error)
            }
        },
    })

    if (isColoursLoading) {
        // too quick for loader
        return <></>
    }

    if (!colours) {
        return <Text color="red">Something went wrong fetching colours...</Text>
    }

    if (!colours.meta.total) {
        return <Text color="dimmed">There are no records yet...</Text>
    }

    return (
        <Group align="start">
            <SectionLayout sx={{ flex: 1 }}>
                <ColoursTable
                    colours={colours.data}
                    deleteColour={deleteColour}
                />

                <Center mt="xl">
                    <Pagination
                        page={colours.meta.current_page}
                        onChange={setPage}
                        total={colours.meta.last_page}
                    />
                </Center>
            </SectionLayout>

            <SectionLayout title="Add colour" w={400}>
                <CreateColourForm />
            </SectionLayout>
        </Group>
    )
}

ColoursIndex.getLayout = (page: ReactElement) => (
    <Container>
        <PageLayout breadcrumbs={['Colours']} children={page} />
    </Container>
)
