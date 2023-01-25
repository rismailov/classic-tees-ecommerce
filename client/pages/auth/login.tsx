import AuthLayout from '@/components/layouts/AuthLayout'
import { login } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY, RR_MIDDLEWARE_GUEST_SHOP } from '@/lib/constants'
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
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

export default function Login() {
    const ref = useFocusTrap()

    const queryClient = useQueryClient()

    const router = useRouter()

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

            // TODO: redirect based on user role
            router.push(RR_MIDDLEWARE_GUEST_SHOP)
        } catch (_) {
            setIsFormSubmitting(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            {isFormSubmitting && <LoadingOverlay visible={true} />}

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
