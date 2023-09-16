import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { RR_MIDDLEWARE_GUEST_SHOP } from './lib/constants'

export const config = {
    matcher: '/auth/:path*',
}

const checkUserAuth = async (request: NextRequest) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
                credentials: 'include',
                headers: {
                    accept: 'application/json',
                    referer:
                        process.env.NEXT_PUBLIC_CLIENT_URL ??
                        'http://127.0.0.1:3000',
                    cookie: request.headers.get('cookie') ?? '',
                },
            },
        )

        return response.status === 200
    } catch (error) {
        console.error('err: ', error)
    }
}

const fetchCsrf = async (): Promise<NextResponse | false> => {
    try {
        const csrf = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
        )

        const response = NextResponse.next()
        const cookies = csrf.headers.get('set-cookie')

        if (cookies) {
            response.headers.set('set-cookie', cookies)
        }

        return response
    } catch (error) {
        console.log(error)
        return false
    }
}

// This solution is borrowed from:
// https://github.com/tobeycodes/nextjs-laravel-sanctum/blob/master/frontend/pages/login.js
export async function middleware(request: NextRequest) {
    const isUserAuth = await checkUserAuth(request)

    console.log(isUserAuth)

    if (isUserAuth) {
        return NextResponse.redirect(RR_MIDDLEWARE_GUEST_SHOP)
    }

    // const response = await fetchCsrf()

    // console.log('is csrf request successful: ', !!response)

    // return response ?? NextResponse.next()

    return NextResponse.next()
}
