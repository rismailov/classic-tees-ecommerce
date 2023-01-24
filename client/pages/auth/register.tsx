import AuthLayout from '@/components/layouts/AuthLayout'
import { register } from '@/lib/api/auth'
import { REACT_QUERY_AUTH_KEY } from '@/lib/constants'
import { RegisterDto } from '@/types/api/dto/auth/register.dto'
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import Head from 'next/head'
import { ReactElement } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export default function Register() {
    const queryClient = useQueryClient()
    const ref = useFocusTrap()
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

    const { mutateAsync, isLoading } = useMutation(register, { meta: { form } })

    const onSubmit = async (values: RegisterDto) => {
        await mutateAsync(values)

        queryClient.invalidateQueries(REACT_QUERY_AUTH_KEY)
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Head>
                <title>Register</title>
            </Head>

            <Stack>
                {/* <Group grow noWrap align="start"> */}
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
                {/* </Group> */}

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
                    loading={isLoading}
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
