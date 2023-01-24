import { getUser, logoutUser } from '@/lib/api/auth'
import {
    REACT_QUERY_AUTH_KEY,
    REDIRECT_ROUTE_MIDDLEWARE_AUTH,
    REDIRECT_ROUTE_MIDDLEWARE_GUEST,
} from '@/lib/constants'
import { UserEntity } from '@/types/entities/user.entity'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type UseAuthReturnType = {
    user: UserEntity | undefined | null
    logout: () => Promise<void>
    isLoading: boolean
}

export const useAuth = ({
    middleware,
}: {
    // if middleware not passed, then there's no redirect needed
    // an example could be rendering user data in a static component like header
    middleware?: 'guest' | 'auth'
} = {}): UseAuthReturnType => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const [user, setUser] = useState<UserEntity | undefined | null>()

    // FIXME: not critical, but
    // NOTE: for some reason this "data" variable not getting updates,
    // - that's why i'm using state here and manually updating it
    const {
        data: _,
        error,
        isLoading,
    } = useQuery({
        queryKey: [REACT_QUERY_AUTH_KEY],
        queryFn: getUser,
        retry: false,
        onSuccess: (data) => setUser(data),
        onError: () => setUser(null),
    })

    async function logout() {
        await logoutUser()

        queryClient.invalidateQueries({
            queryKey: [REACT_QUERY_AUTH_KEY],
        })
    }

    useEffect(() => {
        if (middleware === 'guest' && user) {
            router.push(REDIRECT_ROUTE_MIDDLEWARE_GUEST)
        }

        if (middleware === 'auth' && error) {
            router.push(REDIRECT_ROUTE_MIDDLEWARE_AUTH)
        }
    }, [user, error])

    return {
        user,
        logout,
        isLoading,
    }
}
