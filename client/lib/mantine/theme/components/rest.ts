import {
    ActionIconProps,
    ActionIconStylesNames,
    ActionIconStylesParams,
    BadgeProps,
    BadgeStylesNames,
    BadgeStylesParams,
    ButtonProps,
    ButtonStylesNames,
    ButtonStylesParams,
    ListProps,
    ListStylesNames,
    ListStylesParams,
    SpoilerProps,
    SpoilerStylesNames,
    SpoilerStylesParams,
    Styles,
    TableProps,
    TableStylesParams,
    TooltipProps,
    TooltipStylesNames,
    TooltipStylesParams,
} from '@mantine/core'
import { ThemeComponent } from '.'

export const Button: ThemeComponent<
    ButtonProps,
    Styles<ButtonStylesNames, ButtonStylesParams>
> = {
    defaultProps: {
        radius: 6,
    },

    styles: (theme, params) => ({
        root: {
            fontWeight: 450,
            ...(params.size === 'md' && {
                paddingLeft: 25,
                paddingRight: 25,
                fontSize: theme.fontSizes.md,
            }),
            ...(params.color === 'dark' && {
                backgroundColor: theme.colors.dark[4],
                ':hover': {
                    backgroundColor: theme.colors.dark[7],
                },
            }),
        },
    }),
}

export const Tooltip: ThemeComponent<
    Omit<TooltipProps, 'children' | 'label'>,
    Styles<TooltipStylesNames, TooltipStylesParams>
> = {
    defaultProps: {
        color: 'gray',
    },

    styles: (theme) => ({
        tooltip: {
            fontWeight: 400,
            backgroundColor: theme.white,
            border: `1px solid ${theme.colors.gray[3]}`,
            color: theme.colors.dark[9],
        },

        arrow: {
            border: `1px solid ${theme.colors.gray[3]}`,
        },
    }),
}

export const ActionIcon: ThemeComponent<
    ActionIconProps,
    Styles<ActionIconStylesNames, ActionIconStylesParams>
> = {
    defaultProps: {
        loaderProps: { variant: 'oval' },
        size: 'lg',
        color: 'dark',
    },

    styles: (theme, params) => ({
        root: {
            ':hover': {
                ...(params.variant === 'subtle' &&
                    params.color === 'dark' && {
                        backgroundColor: theme.colors.gray[1],
                    }),
            },
        },
    }),
}

export const List: ThemeComponent<
    Omit<ListProps, 'children'>,
    Styles<ListStylesNames, ListStylesParams>
> = {
    defaultProps: {
        listStyleType: 'none',
    },
}

export const Badge: ThemeComponent<
    BadgeProps,
    Styles<BadgeStylesNames, BadgeStylesParams>
> = {
    defaultProps: {
        radius: 'xs',
        size: 'sm',
        sx: {
            paddingTop: 10,
            paddingBottom: 10,
        },
    },
}

export const Table: ThemeComponent<
    TableProps,
    Styles<string, TableStylesParams>
> = {
    defaultProps: {
        fontSize: 'sm',
        captionSide: 'bottom',
        verticalSpacing: 7,
    },
}

export const Spoiler: ThemeComponent<
    SpoilerProps,
    Styles<SpoilerStylesNames, SpoilerStylesParams>
> = {
    styles: {
        control: {
            fontWeight: 500,
            fontSize: 15.5,
        },
    },
}
