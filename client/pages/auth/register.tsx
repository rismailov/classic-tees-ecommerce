import AuthLayout from '@/components/layouts/AuthLayout'
import { useAuth } from '@/hooks/use-auth'
import { register } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY } from '@/lib/constants'
import { RegisterDto } from '@/types/api/dto/auth/register.dto'
import { sleep } from '@/utils'
import {
    Button,
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

export default function Register() {
    const queryClient = useQueryClient()
    const { user, isLoading } = useAuth({ middleware: 'guest' })

    const ref = useFocusTrap()

    const [isFormSubmitting, setIsFormSubmitting] = useState(false)
    const form = useForm<RegisterDto>({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validate: {
            fname: (value) =>
                value.length < 2
                    ? 'First name must have at least 2 letters'
                    : null,
            lname: (value) =>
                value.length < 2
                    ? 'Last name must have at least 2 letters'
                    : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid e-mail address',
        },
    })

    const { mutateAsync } = useMutation(register, {
        meta: { form },
    })

    const onSubmit = async (values: RegisterDto) => {
        setIsFormSubmitting(true)

        try {
            await sleep()
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
                <title>Register</title>
            </Head>

            <Stack>
                <TextInput
                    required
                    ref={ref}
                    placeholder="First name"
                    size="md"
                    {...form.getInputProps('fname')}
                />

                <TextInput
                    required
                    placeholder="Last name"
                    size="md"
                    {...form.getInputProps('lname')}
                />

                <TextInput
                    required
                    type="email"
                    placeholder="E-mail"
                    size="md"
                    {...form.getInputProps('email')}
                />

                <PasswordInput
                    required
                    placeholder="Password"
                    size="md"
                    {...form.getInputProps('password')}
                />

                <PasswordInput
                    required
                    placeholder="Confirm password"
                    size="md"
                    {...form.getInputProps('password_confirmation')}
                />

                <Button
                    type="submit"
                    color="dark"
                    h={50}
                    size="md"
                    disabled={Object.values(form.values).some((v) => v === '')}
                    fullWidth
                >
                    Register
                </Button>
            </Stack>
        </form>
    )
}

Register.getLayout = (page: ReactElement) => <AuthLayout children={page} />
