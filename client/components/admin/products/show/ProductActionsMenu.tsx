import { ActionIcon, Menu } from '@mantine/core'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiEye, FiMoreHorizontal, FiTrash } from 'react-icons/fi'

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
                    <FiMoreHorizontal />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    icon={<FiEye size={15} />}
                    component={Link}
                    href={`/shop/${nanoid}`}
                    target="_blank"
                >
                    View in store
                </Menu.Item>

                <Menu.Item icon={<FiTrash size={15} />} color="red">
                    Delete product
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
