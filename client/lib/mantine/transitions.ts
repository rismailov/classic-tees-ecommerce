import { MantineTransition } from '@mantine/core'

export const slideDown: MantineTransition = {
    in: { opacity: 1, transform: 'translateY(10px)', transitionTimingFunction: 'ease-out' },
    out: { opacity: 0, transform: 'translateY(-10px)', transitionTimingFunction: 'ease-in' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
}

export const slideUp: MantineTransition = {
    in: { opacity: 1, transform: 'translateY(-10px)', transitionProperty: 'opacity, transform' },
    out: { opacity: 0, transform: 'none', transitionDuration: '0s', transitionProperty: 'none' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'none',
}

export const slideRight: MantineTransition = {
    in: { opacity: 1, transform: 'translateX(0px)' },
    out: { opacity: 0, transform: 'translateX(5px)' },
    transitionProperty: 'transform,opacity',
}

export const slideLeft: MantineTransition = {
    in: { opacity: 1, transform: 'translateX(0px)' },
    out: { opacity: 0, transform: 'translateX(-5px)' },
    transitionProperty: 'transform,opacity',
}
