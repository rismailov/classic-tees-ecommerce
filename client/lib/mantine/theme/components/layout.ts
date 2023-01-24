import {
    CardProps,
    ContainerProps,
    ContainerStylesParams,
    DividerProps,
    DividerStylesNames,
    LoadingOverlayProps,
    MenuProps,
    MenuStylesNames,
    ModalProps,
    ModalStylesNames,
    OverlayProps,
    Styles,
    TransitionProps,
} from '@mantine/core'
import { ThemeComponent } from '.'
import { slideDown, slideUp } from '../../transitions'

export const Container: ThemeComponent<ContainerProps, Styles<string>> = {
    defaultProps: {
        size: 1200,
    },

    styles: (theme) => ({
        root: {
            height: '100%',
        },
    }),
}

export const Card: ThemeComponent<
    CardProps,
    Styles<string, ContainerStylesParams>
> = {
    styles: (theme) => ({
        root: {
            borderRadius: theme.radius.md,
        },
    }),
}

export const Overlay: ThemeComponent<OverlayProps, Styles<string>> = {
    defaultProps: {
        zIndex: 10,
    },
}

export const LoadingOverlay: ThemeComponent<
    Omit<LoadingOverlayProps, 'visible'>,
    Styles<string>
> = {
    defaultProps: {
        zIndex: 999,
    },
}

export const Menu: ThemeComponent<MenuProps, Styles<MenuStylesNames>> = {
    defaultProps: {
        position: 'bottom-end',
        transition: slideDown,
        transitionDuration: 0,
    },
}

export const Modal: ThemeComponent<
    Omit<ModalProps, 'opened' | 'onClose'>,
    Styles<ModalStylesNames>
> = {
    defaultProps: {
        transition: slideUp,
        transitionDuration: 150,

        overlayBlur: 2,
        radius: 'md',
    },

    styles: (theme) => ({
        title: { fontSize: theme.fontSizes.lg, fontWeight: 600 },
    }),
}

export const Divider: ThemeComponent<
    DividerProps,
    Styles<DividerStylesNames>
> = {
    defaultProps: {
        sx: { opacity: '0.5' },
    },
}

export const Transition: ThemeComponent<
    Omit<TransitionProps, 'transition' | 'mounted' | 'children'>,
    Styles<string>
> = {
    defaultProps: {
        exitDuration: 0,
        duration: 200,
    },
}
