export const defaultProps: {
    select: any //Omit<SelectProps, 'data'>
    input: any // InputBaseProps
} = {
    select: {
        size: 'sm',
    },

    input: {
        size: 'sm',
        radius: 6,
        spellCheck: false,
    },
}
