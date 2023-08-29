/**
 * A simple notifications wrapper around Mantine Notifications hook to save some typing ;)
 *
 */
import { NotificationProps, useMantineTheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react'
// import useTranslation from 'next-translate/useTranslation'

type Props = {
    message: string
} & NotificationProps

type Color = 'green' | 'red' | 'blue' | 'orange'

export const useToast = () => {
    // const { t } = useTranslation()
    const theme = useMantineTheme()
    const defaultProps: NotificationProps = {
        disallowClose: true,
    }

    function getIconBackground(color: Color) {
        return theme.colors[color][theme.fn.primaryShade(theme.colorScheme)]
    }

    function notificationConstructor({
        arg,
        color,
        icon,
        title,
    }: {
        arg: string | Props
        color: Color
        icon: NotificationProps['icon']
        title: NotificationProps['title']
    }) {
        return showNotification({
            color,
            title,
            message: typeof arg === 'string' ? arg : (arg as Props).message,
            icon,
            styles: {
                icon: {
                    backgroundColor: getIconBackground(color),
                },
            },
            ...defaultProps,
            ...(typeof arg === 'object' && arg),
        })
    }

    function showSuccess(arg: string | Props): void {
        return notificationConstructor({
            arg,
            color: 'green',
            title: 'Success',
            icon: <IconCheck strokeWidth={3} />,
        })
    }

    function showError(arg: string | Props): void {
        return notificationConstructor({
            arg,
            color: 'red',
            title: 'Error',
            icon: <IconX strokeWidth={3} />,
        })
    }

    function showWarning(arg: string | Props): void {
        return notificationConstructor({
            arg,
            color: 'orange',
            title: 'Warning',
            icon: <IconAlertTriangle strokeWidth={3} />,
        })
    }

    function showInfo(arg: string | Props): void {
        return notificationConstructor({
            arg,
            color: 'blue',
            title: 'Info',
            icon: <IconAlertTriangle strokeWidth={3} />,
        })
    }

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
    }
}
