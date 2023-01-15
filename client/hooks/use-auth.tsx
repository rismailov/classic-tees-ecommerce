import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { getUser, logoutUser } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY } from '@/lib/constants'
import { UserEntity } from '@/types/entities/fuser.entity'

type UseAuthReturnType = {
    user: UserEntity | undefined
    logout: () => Promise<void>
}

export const useAuth = ({
    middleware,
}: { middleware?: 'guest' | 'auth' | 'none' } = {}): UseAuthReturnType => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data: user, error } = useQuery([REACT_QUERY_AUTH_KEY], getUser)

    async function logout() {
        await logoutUser()

        queryClient.resetQueries(REACT_QUERY_AUTH_KEY)
    }

    useEffect(() => {
        if (middleware === 'guest' && user) {
            router.push('/dashboard')
        }

        if (middleware === 'auth' && error) {
            router.push('/auth/login')
        }
    }, [user, error])

    return { user, logout }
}
