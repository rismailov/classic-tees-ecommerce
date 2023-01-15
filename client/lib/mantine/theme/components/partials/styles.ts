import {
    InputBaseStylesNames,
    InputStylesParams,
    SelectStylesNames,
    Styles,
} from '@mantine/core'

export const selectStyles: Styles<SelectStylesNames, any> = (theme) => ({
    input: {
        fontWeight: 400,
        transition: 'none',
        ':focus-within': {
            boxShadow: `0 0 0 0.05rem ${theme.fn.primaryColor()}`,
        },
        '&::placeholder': {
            color: theme.colors.dark[2],
        },
    },

    item: {
        fontWeight: 400,
        fontSize: theme.fontSizes.sm,
        paddingTop: 7,
        paddingBottom: 7,
    },
})

export const inputStyles: Styles<InputBaseStylesNames, InputStylesParams> = (
    theme,
    params,
) => ({
    input: {
        transition: 'none',
        ':focus-within': {
            boxShadow: `0 0 0 0.05rem ${theme.fn.primaryColor()}`,

            ...(params.variant === 'filled' && {
                backgroundColor: theme.white,
            }),
        },
    },
})
