import { MantineThemeOverride } from '@mantine/core'
import * as components from './components'

const theme: MantineThemeOverride = {
    primaryColor: 'orange',
    primaryShade: 8,
    loader: 'oval',
    cursorType: 'pointer',
    defaultGradient: { from: 'blue', to: 'teal', deg: 20 },
    fontSizes: { md: 15 },
    // @ts-ignore
    components,
}

export default theme
