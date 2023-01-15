import { showNotification } from '@mantine/notifications'
import { AxiosError } from 'axios'
import { MutationMeta } from 'react-query'
import { isAnObject } from './is-object'

type LaravelApiErrorData = {
    message: string
    errors: { [key: string]: string[] }
}

// NOTE: not used
export const handleAxiosErrors = (
    error: AxiosError,
    meta: MutationMeta | undefined,
) => {
    if (!error.response) {
        return console.error(error)
    }

    if (error.response.status === 422) {
        // @ts-ignore
        if (isAnObject(meta) && 'form' in meta) {
            const data = error.response.data as LaravelApiErrorData

            for (const prop in data.errors) {
                const errorMessages = data.errors[prop]

                // @ts-ignore
                errorMessages.forEach((e: string) =>
                    // @ts-ignore
                    meta.form.setFieldError(prop, e),
                )
            }

            return
        }

        return console.error(
            '[handleAxiosErrors]: Unhandled validation error: Form object was not passed to the QueryCache/MutationCache handler',
        )
    }

    // Show notification if server has something to say
    if (error.response.status >= 500) {
        // @ts-ignore
        if (error.response.data?.message) {
            return showNotification({
                title: 'Error',
                // @ts-ignore
                message: error.response.data.message,
                color: 'red',
            })
        }
    }

    return showNotification({
        title: 'Error',
        message: error.message,
        color: 'red',
    })
}
