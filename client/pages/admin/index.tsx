import { AdminLayout } from '@/components/layouts/AdminLayout'
import { ReactElement } from 'react'

// TODO
export default function AdminIndex() {
    return <></>
}

AdminIndex.getLayout = (page: ReactElement) => <AdminLayout children={page} />
