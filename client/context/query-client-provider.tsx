import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'
import { ReactNode, useState } from 'react'
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query'

export const QCProvider = ({ children }: { children: ReactNode }) => {
    const { showError, showSuccess } = useToast()
    const [queryClient] = useState<QueryClient>(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                    },
                },

                mutationCache: new MutationCache({
                    onError: (error, _variables, _context, { meta }) => {
                        if (error instanceof AxiosError) {
                            // handle 500+
                            if (
                                error.response &&
                                error.response.status >= 500
                            ) {
                                // display message if api has something to say
                                if (error.response.data.message) {
                                    return showError(
                                        error.response.data.message,
                                    )
                                }

                                // show generic message for production and
                                // the actual message for local development
                                showError(
                                    process.env.NEXT_PUBLIC_APP_ENV === 'local'
                                        ? {
                                              title: error.response.data
                                                  .message,
                                              message: error.message,
                                          }
                                        : 'Unexpected error occured',
                                )
                            }

                            // handle 422
                            if (
                                error.response &&
                                error.response.status === 422
                            ) {
                                // form object should be passed to meta each time
                                // this is needed to show validation errors under inputs.
                                // NOTE: might be not the most beautiful solution, but it's very handy
                                if (!meta || !('form' in meta)) {
                                    return showError({
                                        title: error.response.data.message,
                                        message: error.message,
                                    })
                                }

                                const data = error.response.data as {
                                    message: string
                                    errors: { [key: string]: string[] }
                                }

                                for (const prop in data.errors) {
                                    const errorMessages = data.errors[prop]

                                    errorMessages.forEach((e: string) =>
                                        // @ts-ignore
                                        meta.form.setFieldError(prop, e),
                                    )
                                }

                                return
                            }
                        }

                        return console.error(
                            'unhandled non-axios error: ',
                            error,
                        )
                    },

                    // FIX: typings
                    // @ts-ignore
                    onSuccess: (
                        { message },
                        _variables,
                        _context,
                        { meta },
                    ) => {
                        if (typeof message === 'string') {
                            return showSuccess(message)
                        }

                        if (meta?.message && typeof meta.message === 'string') {
                            return showError(meta.message)
                        }
                    },
                }),
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
