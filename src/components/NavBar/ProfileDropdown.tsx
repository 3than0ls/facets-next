"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import { logout } from '@/utils/supabase/authActions';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import * as A from '@radix-ui/react-avatar';
import * as DM from '@radix-ui/react-dropdown-menu';
import Link from '../Link';



const supabase = createClient()


const ProfileDropdown = () => {
    // TODO: replace Login/Logout with a Profile dropdown, with login logout as an option
    // and view profile as another option, with another page going to that profile
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => {
        const authUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        authUser()
    }, [])

    const logoutOnClick = async () => {
        await logout()
        setUser(null)
    }

    // TODO: replace Login/Logout with a Profile dropdown, with login logout as an option
    // and view profile as another option, with another page going to that profile


    return user === null ? <Link href="/login" text="Login" colorTheme='white' /> : (
        // <button onClick={logoutOnClick}>Logout</button>
        <DM.Root>
            <DM.Trigger asChild>
                <A.Root className="hover:cursor-pointer inline-flex w-9 h-9 select-none items-center justify-center overflow-hidden rounded-xl align-middle">
                    <A.Fallback className="text-accent text-lg flex h-full w-full items-center justify-center bg-white font-bold">
                        {user?.user_metadata?.username[0].toUpperCase() ?? "?"}
                    </A.Fallback>
                </A.Root>

            </DM.Trigger>

            <DM.Portal>
                <DM.Content
                    className="shadow-lg bg-primary rounded-lg mr-8 py-4 text-md animate-dropdownMenu"
                    sideOffset={5}
                    side='top'
                >
                    <DM.Item className="hover:outline-none ml-5 mr-16 line text-accent">
                        <div className="leading-none mt-[1px]">Logged in as:</div>
                        <div className="text-md font-bold leading-normal">{user?.user_metadata?.username ?? "?"}</div>
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