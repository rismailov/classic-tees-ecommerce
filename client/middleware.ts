import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { RR_MIDDLEWARE_GUEST_SHOP } from './lib/constants'

export const config = {
    matcher: '/auth/:path*',
}

// This solution is borrowed from:
// https://github.com/tobeycodes/nextjs-laravel-sanctum/blob/master/frontend/pages/login.js
export async function middleware(request: NextRequest) {
    try {
        const isAuthed = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user`,
            {
                credentials: 'include',
                headers: {
                    accept: 'application/json',
                    referer:
                        process.env.NEXT_PUBLIC_CLIENT_URL ??
                        'http://localhost:3000',
                    cookie: request.headers.get('cookie') ?? '',
                },
            },
        )

        if (isAuthed.status === 200) {
            return NextResponse.redirect(RR_MIDDLEWARE_GUEST_SHOP)
        }
    } catch (error) {
        console.error('err: ', error)
    }

    const csrf = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`,
    )
    const response = NextResponse.next()
    const cookies = csrf.headers.get('set-cookie')

    if (cookies) {
        response.headers.set('set-cookie', cookies)
    }

    return response
}
