import { Hero } from '@/components/home-page/Hero'
import { ShopByCategory } from '@/components/home-page/ShopByCategory'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>

                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Sections */}
            <Hero />
            <ShopByCategory />
        </>
    )
}
