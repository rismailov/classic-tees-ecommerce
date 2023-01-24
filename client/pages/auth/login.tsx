import AuthLayout from '@/components/layouts/AuthLayout'
import { useAuth } from '@/hooks/use-auth'
import { login } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY } from '@/lib/constants'
import { LoginDto } from '@/types/api/dto/auth/login.dto'
import { sleep } from '@/utils'
import {
    Button,
    Checkbox,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Head from 'next/head'
import { ReactElement, useState } from 'react'

export default function Login() {
    const ref = useFocusTrap()

    // NOTE: i'm activating useAuth here and not in "AuthLayout" component (which would be cleaner)
    // because conditionally rendering LoadingOverlay or children causes inputs
    // to lose the data because of constant data refetching (on window focus etc.).
    const { user, isLoading } = useAuth({ middleware: 'guest' })

    const queryClient = useQueryClient()
    const [isFormSubmitting, setIsFormSubmitting] = useState(false)
    const form = useForm<LoginDto>({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const { mutateAsync } = useMutation(login, { meta: { form } })

    const onSubmit = async (values: LoginDto) => {
        setIsFormSubmitting(true)

        try {
            await sleep() // purely for animation
            await mutateAsync(values)

            queryClient.invalidateQueries({
                queryKey: [REACT_QUERY_AUTH_KEY],
            })
        } catch (_) {}

        setIsFormSubmitting(false)
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            {(user || isLoading || isFormSubmitting) && (
                <LoadingOverlay visible={true} />
            )}

            <Head>
                <title>Login</title>
            </Head>

            <Stack>
                <TextInput
                    ref={ref}
                    required
                    size="md"
                    type="email"
                    placeholder="E-mail"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    required
                    size="md"
                    placeholder="Password"
                    {...form.getInputProps('password')}
                />

                <Checkbox
                    label="Remember me"
                    {...form.getInputProps('remember')}
                />

                <Button
                    type="submit"
                    size="md"
                    color="dark"
                    disabled={Object.values(form.values).some((v) => v === '')}
                    fullWidth
                >
                    Login
                </Button>
            </Stack>
        </form>
    )
}

Login.getLayout = (page: ReactElement) => <AuthLayout children={page} />
