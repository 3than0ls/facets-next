'use client'

import React from 'react'
import { logout } from '@/utils/supabase/authActions'
import * as A from '@radix-ui/react-avatar'
import * as DM from '@radix-ui/react-dropdown-menu'
import Link from '../Link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const ProfileDropdown = () => {
    const { user } = useAuth()
    const router = useRouter()

    const logoutOnClick = async () => {
        await logout()
        router.refresh()
    }

    return user === null ? (
        <Link href="/login" text="Login" colorTheme="white" />
    ) : (
        // <button onClick={logoutOnClick}>Logout</button>
        <DM.Root>
            <DM.Trigger asChild>
                <A.Root className="hover:cursor-pointer inline-flex w-9 h-9 select-none items-center justify-center overflow-hidden rounded-xl align-middle">
                    <A.Fallback className="text-accent text-lg flex h-full w-full items-center justify-center bg-white font-bold">
                        {user?.user_metadata?.username[0].toUpperCase() ?? '?'}
                    </A.Fallback>
                </A.Root>
            </DM.Trigger>

            <DM.Portal>
                <DM.Content
                    className="shadow-lg bg-primary rounded-lg mr-8 py-4 text-md animate-dropdownMenu"
                    sideOffset={5}
                    side="top"
                >
                    <DM.Item className="hover:outline-none ml-5 mr-16 line text-accent">
                        <div className="leading-none mt-[1px]">
                            Logged in as:
                        </div>
                        <div className="text-md font-bold leading-normal">
                            {user?.user_metadata?.username ?? '?'}
                        </div>
                    </DM.Item>
                    <DM.Separator className="h-[2px] bg-accent my-2" />
                    <DM.Item className="hover:outline-none ml-5 mr-16">
                        <Link href="/user/" text="Your profile" />
                    </DM.Item>
                    <DM.Item className="hover:outline-none ml-5 mr-16">
                        <Link onClick={logoutOnClick} href="/" text="Log out" />
                    </DM.Item>
                    <DM.Arrow className="fill-primary mr-6" />
                </DM.Content>
            </DM.Portal>
        </DM.Root>
    )
}

export default ProfileDropdown
