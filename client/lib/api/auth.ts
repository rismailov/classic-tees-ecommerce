import axios from '@/lib/axios'
import { UserEntity } from '@/types/entities/fuser.entity'

/**
 * Types
 */
export type LoginDto = {
    email: string
    password: string
    remember: boolean
}

export type RegisterDto = {
    firstName: string
    lastName: string
    email: string
    password: string
    passwordConfirmation: string
    isTosAccepted: false // Terms of Service
}

/**
 * Endpoints
 */
export const getUser = async (): Promise<UserEntity> => await axios.get('user')

export const login = async (formValues: LoginDto): Promise<void> =>
    await axios.post('/login', formValues)

export const register = async (formValues: RegisterDto): Promise<void> =>
    await axios.post('/register', formValues)

export const logoutUser = async () => await axios.post('auth/logout')
