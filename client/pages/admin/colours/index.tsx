import { ColoursTable } from '@/components/admin/colours/ColoursTable'
import { CreateColourForm } from '@/components/admin/colours/CreateColourForm'
import { SectionLayout } from '@/components/admin/SectionLayout'
import { PageLayout } from '@/components/layouts/admin/PageLayout'
import { getColours, removeColour } from '@/lib/api/admin/colours'
import { REACT_QUERY_COLOURS_KEY } from '@/lib/constants'
import { Group, Text } from '@mantine/core'
import { ReactElement } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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
        <Group align="start">
            <SectionLayout title="Colours" sx={{ flex: 1 }}>
                <ColoursTable colours={colours} deleteColour={deleteColour} />
            </SectionLayout>

            <SectionLayout title="Add colour" w={400}>
                <CreateColourForm />
            </SectionLayout>
        </Group>
    )
}

ColoursIndex.getLayout = (page: ReactElement) => (
    <PageLayout breadcrumbs={['Colours']} children={page} />
)
