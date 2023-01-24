import axios from '@/lib/axios'
import { LoginDto } from '@/types/api/dto/auth/login.dto'
import { RegisterDto } from '@/types/api/dto/auth/register.dto'
import { UserEntity } from '@/types/entities/user.entity'

export const csrf = async () => await axios.get('/sanctum/csrf-cookie')

export const getUser = async (): Promise<UserEntity> => await axios.get('user')

export const login = async (formValues: LoginDto): Promise<void> =>
    await axios.post('/login', formValues)

export const register = async (formValues: RegisterDto): Promise<void> =>
    await axios.post('/register', formValues)

export const logoutUser = async () => await axios.post('/logout')
