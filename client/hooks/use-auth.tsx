import { getUser, logoutUser } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY } from '@/lib/constants'
import { UserEntity } from '@/types/entities/user.entity'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'

type UseAuthReturnType = {
    user: UserEntity | undefined
    logout: () => Promise<void>
    isLoading: boolean
}

export const useAuth = ({
    middleware,
}: {
    // if middleware not passed, then there's no redirect needed
    // an example can be rendering user data in a static component like header
    middleware?: 'guest' | 'auth'
} = {}): UseAuthReturnType => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const {
        data: user,
        error,
        status,
    } = useQuery({
        queryFn: getUser,
        queryKey: [REACT_QUERY_AUTH_KEY],
    })

    async function logout() {
        await logoutUser()

        queryClient.resetQueries(REACT_QUERY_AUTH_KEY)
    }

    useEffect(() => {
        if (middleware === 'guest' && user) {
            router.push('/shop')
        }

        if (middleware === 'auth' && error) {
            router.push('/auth/login')
        }
    }, [user, error])

    return {
        user,
        logout,
        isLoading: status === 'loading',
    }
}
