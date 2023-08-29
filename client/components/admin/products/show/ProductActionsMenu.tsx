import { ActionIcon, Menu } from '@mantine/core'
import { IconDotsDiagonal, IconEye, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

export const ProductActionsMenu = ({ nanoid }: { nanoid: string }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <Menu
            width={200}
            opened={isMenuOpen}
            onChange={setIsMenuOpen}
            withinPortal
        >
            <Menu.Target>
                <ActionIcon>
                    <IconDotsDiagonal />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    icon={<IconEye size={15} />}
                    component={Link}
                    href={`/shop/${nanoid}`}
                    target="_blank"
                >
                    View in store
                </Menu.Item>

                <Menu.Item icon={<IconTrash size={15} />} color="red">
                    Delete product
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
