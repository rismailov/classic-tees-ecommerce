import axios from '@/lib/axios'
import { LoginDto } from '@/types/api/dto/auth/login.dto'
import { RegisterDto } from '@/types/api/dto/auth/register.dto'
import { UserEntity } from '@/types/entities/user.entity'

export const csrf = (): Promise<void> => axios.get('/sanctum/csrf-cookie')

export const getUser = (): Promise<UserEntity> => axios.get('user')

export const login = (formValues: LoginDto): Promise<void> =>
    axios.post('/login', formValues)

export const register = (formValues: RegisterDto): Promise<void> =>
    axios.post('/register', formValues)

export const logoutUser = (): Promise<void> => axios.post('/logout')
