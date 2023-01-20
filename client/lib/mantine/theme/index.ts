import { MantineThemeOverride } from '@mantine/core'
import * as components from './components'

const theme: MantineThemeOverride = {
    primaryColor: 'indigo',
    primaryShade: 6,
    loader: 'oval',
    cursorType: 'pointer',
    defaultGradient: { from: 'blue', to: 'teal', deg: 20 },
    fontSizes: { md: 15 },
    // @ts-ignore
    components,
}

export default theme
