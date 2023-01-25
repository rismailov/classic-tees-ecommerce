import { getUser, logoutUser } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY } from '@/lib/constants'
import { UserEntity } from '@/types/entities/user.entity'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

type UseAuthReturnType = {
    user: UserEntity | undefined | null
    logout: () => Promise<void>
    isLoading: boolean
}

// NOTE: currently this hook's only functions are:
// 1. getting auth. user data
// 2. logging out
// TODO: when project finished, check if there's even need for this hook.
// TODO: we can instead just fetch user in 2-3 places needed
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

    // NOTE: this code is commented out because we're
    // using an actual middleware
    // @see @/middleware.ts
    // ------------------------------------------------------
    // useEffect(() => {
    //     if (middleware === 'guest' && user) {
    //         router.push(REDIRECT_ROUTE_MIDDLEWARE_GUEST)
    //     }

    //     if (middleware === 'auth' && error) {
    //         router.push(REDIRECT_ROUTE_MIDDLEWARE_AUTH)
    //     }
    // }, [user, error])

    return {
        user,
        logout,
        isLoading,
    }
}
