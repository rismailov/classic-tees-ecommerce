// https://github.com/microsoft/TypeScript/issues/30471#issuecomment-474963436
declare module 'console' {
    export = typeof import('console')
}
