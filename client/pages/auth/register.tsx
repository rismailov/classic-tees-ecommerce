import AuthLayout from '@/components/layouts/AuthLayout'
import {
    Button,
    Checkbox,
    Group,
    PasswordInput,
    Stack,
    TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useFocusTrap } from '@mantine/hooks'
import Head from 'next/head'
import { ReactElement } from 'react'
import { RegisterDto } from '@/lib/api/auth'

export default function Register() {
    const ref = useFocusTrap()
    const form = useForm<RegisterDto>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            isTosAccepted: false,
        },
        validate: {
            firstName: (value) =>
                value.length < 2
                    ? 'First name must have at least 2 letters'
                    : null,
            lastName: (value) =>
                value.length < 2
                    ? 'Last name must have at least 2 letters'
                    : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid e-mail address',
        },
    })

    const onSubmit = (values: RegisterDto) => {
        console.log(values)
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
                    {...form.getInputProps('firstName')}
                />

                <TextInput
                    required
                    placeholder="Last name"
                    size="md"
                    {...form.getInputProps('lastName')}
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
                    {...form.getInputProps('passwordConfirmation')}
                />

                <Checkbox
                    label="I agree to sell my privacy"
                    {...form.getInputProps('isTosAccepted')}
                />

                <Button
                    type="submit"
                    size="md"
                    disabled={
                        !form.values.isTosAccepted ||
                        Object.values(form.values).some((v) => v === '')
                    }
                    fullWidth
                >
                    Register
                </Button>
            </Stack>
        </form>
    )
}

Register.getLayout = (page: ReactElement) => <AuthLayout children={page} />
