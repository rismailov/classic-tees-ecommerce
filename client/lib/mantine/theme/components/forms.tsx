import {
    CheckboxProps,
    CheckboxStylesNames,
    CheckboxStylesParams,
    ColorInputProps,
    ColorInputStylesNames,
    MultiSelectProps,
    MultiSelectStylesNames,
    MultiSelectStylesParams,
    NumberInputProps,
    NumberInputStylesNames,
    PasswordInputProps,
    PasswordInputStylesNames,
    RadioProps,
    RadioStylesNames,
    RadioStylesParams,
    SelectProps,
    SelectStylesNames,
    Styles,
    TextareaProps,
    TextInputProps,
    TextInputStylesNames,
} from '@mantine/core'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { ThemeComponent } from '.'
import { defaultProps } from './partials/default-props'
import { inputStyles, selectStyles } from './partials/styles'

export const Select: ThemeComponent<
    Partial<SelectProps>,
    Styles<SelectStylesNames>
> = {
    defaultProps: defaultProps.select,
    styles: selectStyles,
}

export const MultiSelect: ThemeComponent<
    Omit<MultiSelectProps, 'data'>,
    Styles<MultiSelectStylesNames, MultiSelectStylesParams>
> = {
    defaultProps: defaultProps.select,

    styles: (theme) => ({
        value: {
            fontSize: theme.fontSizes.xs,
            background: theme.fn.rgba(theme.fn.primaryColor(), 0.9),
            color: theme.white,
            '& > button': {
                color: theme.white,
            },
        },

        item: {
            fontSize: theme.fontSizes.sm,
            paddingTop: 7,
            paddingBottom: 7,
        },

        searchInput: {
            fontSize: theme.fontSizes.sm,
            fontWeight: 400,
            transition: 'none',

            '&::placeholder': {
                color: theme.colors.dark[2],
            },
        },
    }),
}

export const Checkbox: ThemeComponent<
    CheckboxProps,
    Styles<CheckboxStylesNames, CheckboxStylesParams>
> = {
    defaultProps: {
        size: 'xs',
    },
    styles: (theme) => ({
        label: {
            paddingLeft: 8,
            fontSize: 14,
            fontWeight: 400,
            userSelect: 'none',
        },
        input: {
            transition: 'none',
            width: 17,
            height: 17,
        },
        icon: {
            transition: 'none',
        },
        inner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
}

export const Radio: ThemeComponent<
    RadioProps,
    Styles<RadioStylesNames, RadioStylesParams>
> = {
    styles: (theme) => ({
        wrapper: {
            display: 'flex',
            alignItems: 'center',
        },

        radio: {
            width: 15,
            height: 15,
        },

        icon: {
            width: 6,
            height: 6,
            top: `calc(50% - ${6 / 2}px)`,
            left: `calc(50% - ${6 / 2}px)`,
        },

        label: {
            fontSize: theme.fontSizes.md,
            paddingLeft: 8,
            color: theme.colors.dark[7],
        },
    }),
}

export const TextInput: ThemeComponent<
    TextInputProps,
    Styles<TextInputStylesNames>
> = {
    defaultProps: defaultProps.input,
    styles: inputStyles,
}

export const NumberInput: ThemeComponent<
    NumberInputProps,
    Styles<NumberInputStylesNames>
> = {
    defaultProps: {
        ...defaultProps.input,
        hideControls: true,
        decimalSeparator: '.',
        precision: 2,
    },
    styles: inputStyles,
}

export const PasswordInput: ThemeComponent<
    PasswordInputProps,
    Styles<PasswordInputStylesNames>
> = {
    defaultProps: {
        ...defaultProps.input,
        visibilityToggleIcon: ({ reveal }) =>
            reveal ? (
                <IconEye size={13} style={{ opacity: 0.7 }} />
            ) : (
                <IconEyeOff size={13} style={{ opacity: 0.7 }} />
            ),
    },

    styles: (theme, params) => ({
        input: {
            transition: 'none',

            '&:focus-within': {
                boxShadow: `0 0 0 0.05rem ${theme.fn.primaryColor()}`,

                // @ts-ignore (variant doesn't exist altho it does)
                ...(params.variant &&
                    // @ts-ignore
                    params.variant === 'filled' && {
                        backgroundColor: theme.white,
                    }),
            },
        },

        visibilityToggle: {
            marginRight: 5,
        },
    }),
}

export const Textarea: ThemeComponent<TextareaProps, Styles<string>> = {
    defaultProps: {
        ...defaultProps.input,
    },

    styles: (theme, params) => ({
        input: {
            transition: 'none',

            '&:focus-within': {
                boxShadow: `0 0 0 0.05rem ${theme.fn.primaryColor()}`,

                // @ts-ignore (variant doesn't exist altho it does)
                ...(params.variant &&
                    // @ts-ignore
                    params.variant === 'filled' && {
                        backgroundColor: theme.white,
                    }),
            },
        },
    }),
}

export const ColorInput: ThemeComponent<
    ColorInputProps,
    Styles<ColorInputStylesNames>
> = {
    defaultProps: defaultProps.input,
    styles: inputStyles,
}
