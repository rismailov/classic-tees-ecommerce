import AuthLayout from '@/components/layouts/AuthLayout'
import {
    Button,
    Checkbox,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Head from 'next/head'
import { useFocusTrap } from '@mantine/hooks'
import { LoginDto } from '@/lib/api/auth'
import { ReactElement } from 'react'

export default function Login() {
    const ref = useFocusTrap()
    const form = useForm<LoginDto>({
        initialValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const onSubmit = (values: LoginDto) => {
        console.log(values)
    }

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
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
