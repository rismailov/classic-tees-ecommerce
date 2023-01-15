import { AppLayout } from '@/components/layouts/AppLayout'
import Head from 'next/head'
import { ReactElement } from 'react'

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <p>
                Hello world
                <br />
                Foo
            </p>
        </>
    )
}

Home.getLayout = (page: ReactElement) => <AppLayout children={page} />
